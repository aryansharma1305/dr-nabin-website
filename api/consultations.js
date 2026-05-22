import { getDb, ensureTables } from "./_db.js";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await ensureTables();
    const sql = getDb();

    // ── POST /api/consultations — submit a new consultation request ──
    if (req.method === "POST") {
      const { firstName, lastName, email, phone, consultType, timeframe, message } = req.body;

      if (!firstName || !lastName || !email || !consultType) {
        return res.status(400).json({ ok: false, error: "Missing required fields." });
      }

      const [row] = await sql`
        INSERT INTO consultations (first_name, last_name, email, phone, consult_type, timeframe, message)
        VALUES (${firstName}, ${lastName}, ${email}, ${phone || null}, ${consultType}, ${timeframe || null}, ${message || null})
        RETURNING *
      `;

      return res.status(201).json({ ok: true, data: row });
    }

    // ── GET /api/consultations — list all (admin only) ──
    if (req.method === "GET") {
      const rows = await sql`
        SELECT * FROM consultations ORDER BY submitted_at DESC
      `;
      return res.status(200).json({ ok: true, data: rows });
    }

    // ── DELETE /api/consultations?id=123 — delete one ──
    if (req.method === "DELETE") {
      const id = req.query?.id || new URL(req.url, "http://x").searchParams.get("id");
      if (!id) return res.status(400).json({ ok: false, error: "id is required." });

      await sql`DELETE FROM consultations WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed." });
  } catch (err) {
    console.error("[/api/consultations]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
