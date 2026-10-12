import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createUnlockToken, sendUnlockEmail, verifyUnlockToken } from "../api/_shared.mjs";

const root = fileURLToPath(new URL("../public/", import.meta.url));
const port = Number(process.env.PORT || 4180);
const astroWayUrl = "https://api.astroway.info/v1/public/chart";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(body, null, 2));
}

function sendOptions(res) {
  res.writeHead(204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end();
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function normalizeChartPayload(input = {}) {
  return {
    date: String(input.date || ""),
    time: String(input.time || ""),
    timezoneOffset: Number(input.timezoneOffset ?? -3),
    latitude: Number(input.latitude ?? -34.6037),
    longitude: Number(input.longitude ?? -58.3816),
    houseSystem: String(input.houseSystem || "P"),
  };
}

function validateChartPayload(payload) {
  const errors = [];

  if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.date)) errors.push("date debe tener formato YYYY-MM-DD");
  if (!/^\d{2}:\d{2}:\d{2}$/.test(payload.time)) errors.push("time debe tener formato HH:MM:SS");
  if (!Number.isFinite(payload.timezoneOffset)) errors.push("timezoneOffset invalido");
  if (!Number.isFinite(payload.latitude)) errors.push("latitude invalida");
  if (!Number.isFinite(payload.longitude)) errors.push("longitude invalida");

  return errors;
}

async function callAstroWay(payload) {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(astroWayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AstroWay-Site-URL": "http://127.0.0.1:4180",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const text = await response.text();
    let upstreamBody;

    try {
      upstreamBody = JSON.parse(text);
    } catch {
      upstreamBody = { raw: text.slice(0, 1200) };
    }

    return {
      ok: response.ok && upstreamBody.ok === true,
      status: response.status,
      durationMs: Date.now() - startedAt,
      body: upstreamBody,
      rateLimit: {
        limit: response.headers.get("x-ratelimit-limit"),
        remaining: response.headers.get("x-ratelimit-remaining"),
        reset: response.headers.get("x-ratelimit-reset"),
        retryAfter: response.headers.get("retry-after"),
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function handleChart(req, res) {
  const requestId = crypto.randomUUID();

  try {
    const payload = normalizeChartPayload(await readJson(req));
    const validationErrors = validateChartPayload(payload);

    if (validationErrors.length) {
      sendJson(res, 400, { ok: false, requestId, error: { type: "validation", messages: validationErrors } });
      return;
    }

    console.log(`[${requestId}] /api/chart`, payload);
    const upstream = await callAstroWay(payload);
    console.log(`[${requestId}] AstroWay`, {
      status: upstream.status,
      ok: upstream.ok,
      durationMs: upstream.durationMs,
      remaining: upstream.rateLimit.remaining,
    });

    if (!upstream.ok) {
      sendJson(res, 502, {
        ok: false,
        requestId,
        error: {
          type: "upstream",
          message: "AstroWay no devolvio una carta valida.",
        },
        debug: upstream,
      });
      return;
    }

    sendJson(res, 200, {
      ok: true,
      requestId,
      source: "astroway",
      durationMs: upstream.durationMs,
      rateLimit: upstream.rateLimit,
      data: upstream.body.data,
      footer: upstream.body._footer,
    });
  } catch (error) {
    console.error(`[${requestId}] /api/chart error`, error);
    sendJson(res, error.name === "AbortError" ? 504 : 500, {
      ok: false,
      requestId,
      error: {
        type: error.name === "AbortError" ? "timeout" : "server",
        message: error.message,
      },
    });
  }
}

async function handleCompatibility(req, res) {
  const requestId = crypto.randomUUID();

  try {
    const body = await readJson(req);
    const personA = normalizeChartPayload(body.personA);
    const personB = normalizeChartPayload(body.personB);
    const errorsA = validateChartPayload(personA).map((message) => `personA: ${message}`);
    const errorsB = validateChartPayload(personB).map((message) => `personB: ${message}`);
    const validationErrors = [...errorsA, ...errorsB];

    if (validationErrors.length) {
      sendJson(res, 400, { ok: false, requestId, error: { type: "validation", messages: validationErrors } });
      return;
    }

    console.log(`[${requestId}] /api/compatibility`);
    const [chartA, chartB] = await Promise.all([callAstroWay(personA), callAstroWay(personB)]);

    if (!chartA.ok || !chartB.ok) {
      sendJson(res, 502, {
        ok: false,
        requestId,
        error: {
          type: "upstream",
          message: "No se pudieron calcular las dos cartas.",
        },
        debug: { chartA, chartB },
      });
      return;
    }

    sendJson(res, 200, {
      ok: true,
      requestId,
      source: "astroway",
      charts: {
        personA: chartA.body.data,
        personB: chartB.body.data,
      },
      debug: {
        personA: { durationMs: chartA.durationMs, rateLimit: chartA.rateLimit },
        personB: { durationMs: chartB.durationMs, rateLimit: chartB.rateLimit },
      },
    });
  } catch (error) {
    console.error(`[${requestId}] /api/compatibility error`, error);
    sendJson(res, error.name === "AbortError" ? 504 : 500, {
      ok: false,
      requestId,
      error: {
        type: error.name === "AbortError" ? "timeout" : "server",
        message: error.message,
      },
    });
  }
}


const sendCodeHits = new Map();

function isRateLimited(key, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const hits = (sendCodeHits.get(key) || []).filter((time) => now - time < windowMs);
  hits.push(now);
  sendCodeHits.set(key, hits);
  return hits.length > max;
}

async function handleSendCode(req, res) {
  try {
    const { email, product } = await readJson(req);
    const cleanEmail = String(email || "").trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      sendJson(res, 400, { ok: false, error: { message: "Email invalido." } });
      return;
    }

    const ip = req.socket.remoteAddress || "unknown";
    if (isRateLimited(`${ip}:${cleanEmail}`)) {
      sendJson(res, 429, { ok: false, error: { message: "Demasiados intentos. Proba de nuevo en unos minutos." } });
      return;
    }

    const safeProduct = product === "couple" ? "couple" : "basic";
    const unlock = createUnlockToken({ email: cleanEmail, product: safeProduct });
    const mail = await sendUnlockEmail({ email: cleanEmail, code: unlock.code, product: safeProduct });

    sendJson(res, 200, {
      ok: true,
      token: unlock.token,
      expiresAt: unlock.expiresAt,
      provider: mail.provider,
    });
  } catch (error) {
    console.error("/api/send-code error", error);
    sendJson(res, 500, { ok: false, error: { message: error.message } });
  }
}

async function handleVerifyCode(req, res) {
  try {
    const { token, code } = await readJson(req);
    const result = verifyUnlockToken({ token, code });
    sendJson(
      res,
      result.ok ? 200 : 400,
      result.ok ? { ok: true, product: result.product } : { ok: false, error: { message: result.message } },
    );
  } catch {
    sendJson(res, 400, { ok: false, error: { message: "Solicitud invalida." } });
  }
}

async function serveStatic(req, res, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const safePath = normalize(decodeURIComponent(requestedPath)).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = join(root, safePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
    });
    res.end(file);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "127.0.0.1"}`);

  if (req.method === "OPTIONS") {
    sendOptions(res);
    return;
  }

  if (url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true, service: "astral-page-backend" });
    return;
  }

  if (url.pathname === "/api/chart" && req.method === "POST") {
    await handleChart(req, res);
    return;
  }

  if (url.pathname === "/api/compatibility" && req.method === "POST") {
    await handleCompatibility(req, res);
    return;
  }

  if (url.pathname === "/api/send-code" && req.method === "POST") {
    await handleSendCode(req, res);
    return;
  }

  if (url.pathname === "/api/verify-code" && req.method === "POST") {
    await handleVerifyCode(req, res);
    return;
  }

  await serveStatic(req, res, url.pathname);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Astral page local server: http://127.0.0.1:${port}/`);
  console.log(`Health: http://127.0.0.1:${port}/api/health`);
});
