import { callAstroWay, normalizeChartPayload, validateChartPayload } from "./_shared.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: { message: "Metodo no permitido." } });
    return;
  }

  const requestId = crypto.randomUUID();

  try {
    const payload = normalizeChartPayload(req.body || {});
    const errors = validateChartPayload(payload);

    if (errors.length) {
      res.status(400).json({ ok: false, requestId, error: { type: "validation", messages: errors } });
      return;
    }

    const upstream = await callAstroWay(payload);

    if (!upstream.ok) {
      res.status(502).json({
        ok: false,
        requestId,
        error: { type: "upstream", message: "AstroWay no devolvio una carta valida." },
      });
      return;
    }

    res.status(200).json({
      ok: true,
      requestId,
      source: "astroway",
      durationMs: upstream.durationMs,
      rateLimit: upstream.rateLimit,
      data: upstream.body.data,
      footer: upstream.body._footer,
    });
  } catch (error) {
    const timeout = error.name === "AbortError";
    res.status(timeout ? 504 : 500).json({
      ok: false,
      requestId,
      error: { type: timeout ? "timeout" : "server", message: error.message },
    });
  }
}
