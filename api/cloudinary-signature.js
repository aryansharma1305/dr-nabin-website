import { createCloudinarySignature, getCloudinaryConfig } from "./_cloudinary.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed." });

  try {
    const { cloudName, apiKey, apiSecret, folder } = getCloudinaryConfig();

    if (!cloudName || !apiKey || !apiSecret) {
      return res.status(500).json({ ok: false, error: "Cloudinary environment variables are not configured." });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const signature = createCloudinarySignature({ folder, timestamp }, apiSecret);

    return res.status(200).json({
      ok: true,
      data: {
        apiKey,
        cloudName,
        folder,
        signature,
        timestamp,
      },
    });
  } catch (err) {
    console.error("[/api/cloudinary-signature]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
