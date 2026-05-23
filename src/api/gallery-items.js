import { uploadImageToCloudinary } from "./certificates.js";

const BASE = "/api/gallery-items";

function normalise(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    image: row.image_url,
    publicId: row.public_id,
    uploadedAt: row.uploaded_at,
  };
}

export async function getGalleryItems() {
  const res = await fetch(BASE);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to load gallery items.");
  return (json.data || []).map(normalise);
}

export async function createGalleryItem({ title, category, description, file }) {
  const uploaded = await uploadImageToCloudinary(file);
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      category,
      description,
      imageUrl: uploaded.imageUrl,
      publicId: uploaded.publicId,
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to save gallery item.");
  return normalise(json.data);
}

export async function deleteGalleryItem(id) {
  const res = await fetch(`${BASE}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to remove gallery item.");
  return json;
}
