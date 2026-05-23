import { getDb, ensureTables } from "./_db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await ensureTables();
    const sql = getDb();

    if (req.method === "GET") {
      const rows = await sql`
        SELECT * FROM certificate_images ORDER BY slot ASC
      `;
      return res.status(200).json({ ok: true, data: rows });
    }

    if (req.method === "PUT") {
      const { slot, title, issuer, imageUrl, publicId } = req.body;

      if (!slot || !title || !imageUrl) {
        return res.status(400).json({ ok: false, error: "Missing required fields." });
      }

      const [row] = await sql`
        INSERT INTO certificate_images (slot, title, issuer, image_url, public_id, uploaded_at)
        VALUES (${slot}, ${title}, ${issuer || null}, ${imageUrl}, ${publicId || null}, NOW())
        ON CONFLICT (slot)
        DO UPDATE SET
          title = EXCLUDED.title,
          issuer = EXCLUDED.issuer,
          image_url = EXCLUDED.image_url,
          public_id = EXCLUDED.public_id,
          uploaded_at = NOW()
        RETURNING *
      `;

      return res.status(200).json({ ok: true, data: row });
    }

    if (req.method === "DELETE") {
      const slot = req.query?.slot || new URL(req.url, "http://x").searchParams.get("slot");
      if (!slot) return res.status(400).json({ ok: false, error: "slot is required." });

      await sql`DELETE FROM certificate_images WHERE slot = ${slot}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed." });
  } catch (err) {
    console.error("[/api/certificates]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
