import { getDb, ensureTables } from "./_db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await ensureTables();
    const sql = getDb();

    // ── POST /api/messages — submit a contact message ──
    if (req.method === "POST") {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ ok: false, error: "Missing required fields." });
      }

      const [row] = await sql`
        INSERT INTO messages (name, email, subject, message)
        VALUES (${name}, ${email}, ${subject || null}, ${message})
        RETURNING *
      `;

      return res.status(201).json({ ok: true, data: row });
    }

    // ── GET /api/messages — list all (admin only) ──
    if (req.method === "GET") {
      const rows = await sql`
        SELECT * FROM messages ORDER BY submitted_at DESC
      `;
      return res.status(200).json({ ok: true, data: rows });
    }

    // ── PATCH /api/messages?id=123 — mark as read ──
    if (req.method === "PATCH") {
      const id = req.query?.id || new URL(req.url, "http://x").searchParams.get("id");
      if (!id) return res.status(400).json({ ok: false, error: "id is required." });

      const [row] = await sql`
        UPDATE messages SET is_read = TRUE WHERE id = ${id} RETURNING *
      `;
      return res.status(200).json({ ok: true, data: row });
    }

    // ── DELETE /api/messages?id=123 — delete one ──
    if (req.method === "DELETE") {
      const id = req.query?.id || new URL(req.url, "http://x").searchParams.get("id");
      if (!id) return res.status(400).json({ ok: false, error: "id is required." });

      await sql`DELETE FROM messages WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed." });
  } catch (err) {
    console.error("[/api/messages]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
