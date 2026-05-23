import crypto from "node:crypto";

function parseCloudinaryUrl(url) {
  if (!url) return {};

  try {
    const parsed = new URL(url);
    return {
      cloudName: parsed.hostname,
      apiKey: decodeURIComponent(parsed.username),
      apiSecret: decodeURIComponent(parsed.password),
    };
  } catch (_) {
    return {};
  }
}

export function getCloudinaryConfig() {
  const fromUrl = parseCloudinaryUrl(process.env.CLOUDINARY_URL);

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || fromUrl.cloudName,
    apiKey: process.env.CLOUDINARY_API_KEY || fromUrl.apiKey,
    apiSecret: process.env.CLOUDINARY_API_SECRET || fromUrl.apiSecret,
    folder: process.env.CLOUDINARY_GALLERY_FOLDER || process.env.CLOUDINARY_CERTIFICATE_FOLDER || "dr-yadav-gallery",
  };
}

export function createCloudinarySignature(params, apiSecret) {
  const toSign = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto.createHash("sha1").update(`${toSign}${apiSecret}`).digest("hex");
}
