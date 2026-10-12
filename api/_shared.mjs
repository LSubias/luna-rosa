import { createHmac, randomInt, randomUUID, timingSafeEqual } from "node:crypto";

export const astroWayUrl = "https://api.astroway.info/v1/public/chart";
const unlockTtlMs = 15 * 60 * 1000;

export function normalizeChartPayload(input = {}) {
  return {
    date: String(input.date || ""),
    time: String(input.time || ""),
    timezoneOffset: Number(input.timezoneOffset ?? -3),
    latitude: Number(input.latitude ?? -34.6037),
    longitude: Number(input.longitude ?? -58.3816),
    houseSystem: String(input.houseSystem || "P"),
  };
}

export function validateChartPayload(payload) {
  const errors = [];

  if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.date)) errors.push("date debe tener formato YYYY-MM-DD");
  if (!/^\d{2}:\d{2}:\d{2}$/.test(payload.time)) errors.push("time debe tener formato HH:MM:SS");
  if (!Number.isFinite(payload.timezoneOffset)) errors.push("timezoneOffset invalido");
  if (!Number.isFinite(payload.latitude)) errors.push("latitude invalida");
  if (!Number.isFinite(payload.longitude)) errors.push("longitude invalida");

  return errors;
}

export async function callAstroWay(payload) {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(astroWayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AstroWay-Site-URL": process.env.PUBLIC_SITE_URL || "http://127.0.0.1:4180",
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

function getUnlockSecret() {
  return process.env.UNLOCK_SECRET || "local-dev-secret-change-me";
}

function base64UrlEncode(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function base64UrlDecode(value) {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
}

function signPayload(payload) {
  return createHmac("sha256", getUnlockSecret()).update(payload).digest("base64url");
}

function hashCode(code, salt) {
  return createHmac("sha256", getUnlockSecret()).update(`${salt}:${code}`).digest("base64url");
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createUnlockToken({ email, product }) {
  const code = String(randomInt(100000, 1000000));
  const salt = randomUUID();
  const expiresAt = Date.now() + unlockTtlMs;
  const payload = base64UrlEncode({
    email: String(email || "").trim().toLowerCase(),
    product: String(product || "basic"),
    salt,
    codeHash: hashCode(code, salt),
    expiresAt,
  });
  const signature = signPayload(payload);

  return {
    code,
    expiresAt,
    token: `${payload}.${signature}`,
  };
}

export function verifyUnlockToken({ token, code }) {
  const [payload, signature] = String(token || "").split(".");

  if (!payload || !signature || !safeEqual(signPayload(payload), signature)) {
    return { ok: false, message: "Codigo vencido o invalido. Pedi uno nuevo." };
  }

  const data = base64UrlDecode(payload);

  if (Date.now() > Number(data.expiresAt)) {
    return { ok: false, message: "El codigo vencio. Pedi uno nuevo." };
  }

  if (!safeEqual(hashCode(String(code || "").trim(), data.salt), data.codeHash)) {
    return { ok: false, message: "Codigo incorrecto." };
  }

  return { ok: true, email: data.email, product: data.product };
}

async function sendViaAppsScript({ webAppUrl, secret, email, code, product }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, email, code, product }),
      redirect: "follow",
      signal: controller.signal,
    });

    const text = await response.text();
    let body = {};

    try {
      body = JSON.parse(text);
    } catch {
      throw new Error("El servicio de correo no respondio como se esperaba.");
    }

    if (!response.ok || body.ok !== true) {
      throw new Error(body.error || "No se pudo enviar el correo.");
    }

    return { ok: true, provider: "appsscript" };
  } finally {
    clearTimeout(timeout);
  }
}

export async function sendUnlockEmail({ email, code, product }) {
  const gasUrl = process.env.GAS_WEBAPP_URL;
  const gasSecret = process.env.GAS_SECRET;

  if (gasUrl && gasSecret) {
    return sendViaAppsScript({ webAppUrl: gasUrl, secret: gasSecret, email, code, product });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "Luna Rosa <onboarding@resend.dev>";

  if (!apiKey) {
    console.log(`[email-dev] Codigo ${code} para ${email}`);
    return { ok: true, provider: "console" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Tu codigo para desbloquear el informe",
      html: `
        <div style="font-family:Arial,sans-serif;color:#2f1f31;line-height:1.5">
          <h2>Tu codigo de Luna Rosa</h2>
          <p>Usa este codigo para desbloquear tu ${product === "couple" ? "compatibilidad de pareja" : "carta astral"}:</p>
          <p style="font-size:28px;font-weight:700;letter-spacing:4px">${code}</p>
          <p>Vence en 15 minutos.</p>
        </div>
      `,
    }),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.message || "Resend no pudo enviar el correo.");
  }

  return { ok: true, provider: "resend", id: body.id };
}
