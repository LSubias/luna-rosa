import { createUnlockToken, sendUnlockEmail } from "./_shared.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: { message: "Metodo no permitido." } });
    return;
  }

  try {
    const { email, product } = req.body || {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      res.status(400).json({ ok: false, error: { message: "Email invalido." } });
      return;
    }

    const unlock = createUnlockToken({ email, product });
    const mail = await sendUnlockEmail({ email, code: unlock.code, product });

    res.status(200).json({
      ok: true,
      token: unlock.token,
      expiresAt: unlock.expiresAt,
      provider: mail.provider,
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: { message: error.message } });
  }
}
