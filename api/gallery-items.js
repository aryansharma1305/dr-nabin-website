import { getDb, ensureTables } from "./_db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await ensureTables();
    const sql = getDb();

    if (req.method === "GET") {
      const rows = await sql`SELECT * FROM gallery_items ORDER BY uploaded_at DESC`;
      return res.status(200).json({ ok: true, data: rows });
    }

    if (req.method === "POST") {
      const { title, category, description, imageUrl, publicId } = req.body;

      if (!title || !category || !imageUrl) {
        return res.status(400).json({ ok: false, error: "Missing required fields." });
      }

      const [row] = await sql`
        INSERT INTO gallery_items (title, category, description, image_url, public_id)
        VALUES (${title}, ${category}, ${description || null}, ${imageUrl}, ${publicId || null})
        RETURNING *
      `;

      return res.status(201).json({ ok: true, data: row });
    }

    if (req.method === "DELETE") {
      const id = req.query?.id || new URL(req.url, "http://x").searchParams.get("id");
      if (!id) return res.status(400).json({ ok: false, error: "id is required." });

      await sql`DELETE FROM gallery_items WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed." });
  } catch (err) {
    console.error("[/api/gallery-items]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
