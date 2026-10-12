import { verifyUnlockToken } from "./_shared.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: { message: "Metodo no permitido." } });
    return;
  }

  const { token, code } = req.body || {};
  const result = verifyUnlockToken({ token, code });

  if (!result.ok) {
    res.status(400).json({ ok: false, error: { message: result.message } });
    return;
  }

  res.status(200).json({ ok: true, product: result.product });
}
