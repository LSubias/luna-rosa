export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    hasGasUrl: Boolean(process.env.GAS_WEBAPP_URL),
    hasGasSecret: Boolean(process.env.GAS_SECRET),
    hasResend: Boolean(process.env.RESEND_API_KEY),
    gasUrlLooksValid: String(process.env.GAS_WEBAPP_URL || "").includes("/exec"),
  });
}
