import { callAstroWay, normalizeChartPayload, validateChartPayload } from "./_shared.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: { message: "Metodo no permitido." } });
    return;
  }

  const requestId = crypto.randomUUID();

  try {
    const body = req.body || {};
    const personA = normalizeChartPayload(body.personA);
    const personB = normalizeChartPayload(body.personB);
    const errors = [
      ...validateChartPayload(personA).map((m) => `personA: ${m}`),
      ...validateChartPayload(personB).map((m) => `personB: ${m}`),
    ];

    if (errors.length) {
      res.status(400).json({ ok: false, requestId, error: { type: "validation", messages: errors } });
      return;
    }

    const [chartA, chartB] = await Promise.all([callAstroWay(personA), callAstroWay(personB)]);

    if (!chartA.ok || !chartB.ok) {
      res.status(502).json({
        ok: false,
        requestId,
        error: { type: "upstream", message: "No se pudieron calcular las dos cartas." },
      });
      return;
    }

    res.status(200).json({
      ok: true,
      requestId,
      source: "astroway",
      charts: { personA: chartA.body.data, personB: chartB.body.data },
      debug: {
        personA: { durationMs: chartA.durationMs, rateLimit: chartA.rateLimit },
        personB: { durationMs: chartB.durationMs, rateLimit: chartB.rateLimit },
      },
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
