const BASE = "/api/certificates";

export async function getCertificates() {
  const res = await fetch(BASE);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to load certificates.");

  return (json.data || []).reduce((acc, row) => {
    acc[row.slot] = {
      slot: row.slot,
      title: row.title,
      issuer: row.issuer,
      image: row.image_url,
      publicId: row.public_id,
      uploadedAt: row.uploaded_at,
    };
    return acc;
  }, {});
}

export async function saveCertificate({ slot, title, issuer, imageUrl, publicId }) {
  const res = await fetch(BASE, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slot, title, issuer, imageUrl, publicId }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to save certificate.");
  return json.data;
}

export async function deleteCertificate(slot) {
  const res = await fetch(`${BASE}?slot=${encodeURIComponent(slot)}`, { method: "DELETE" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to remove certificate.");
  return json;
}

export async function uploadImageToCloudinary(file) {
  if (!file?.type?.startsWith("image/")) {
    throw new Error("Please upload an image file.");
  }

  const signedUpload = await getCloudinaryUploadSignature();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signedUpload.apiKey);
  formData.append("folder", signedUpload.folder);
  formData.append("signature", signedUpload.signature);
  formData.append("timestamp", signedUpload.timestamp);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${signedUpload.cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || "Cloudinary upload failed.");

  return {
    imageUrl: json.secure_url,
    publicId: json.public_id,
  };
}

export const uploadCertificateToCloudinary = uploadImageToCloudinary;

async function getCloudinaryUploadSignature() {
  const res = await fetch("/api/cloudinary-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Cloudinary is not configured.");
  return json.data;
}

export function mergeCertificateSlots(slots, certificates) {
  return slots.map((slot) => {
    const uploaded = certificates[slot.slot];
    return {
      ...slot,
      image: uploaded?.image || slot.image,
      publicId: uploaded?.publicId,
      uploadedAt: uploaded?.uploadedAt,
    };
  });
}
