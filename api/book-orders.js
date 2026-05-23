import { getDb, ensureTables } from "./_db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await ensureTables();
    const sql = getDb();

    if (req.method === "POST") {
      const { bookId, bookTitle, quantity, name, email, phone, address } = req.body;

      if (!bookId || !bookTitle || !name || !email) {
        return res.status(400).json({ ok: false, error: "Missing required fields." });
      }

      const [row] = await sql`
        INSERT INTO book_orders (book_id, book_title, quantity, name, email, phone, address)
        VALUES (${bookId}, ${bookTitle}, ${Number(quantity) || 1}, ${name}, ${email}, ${phone || null}, ${address || null})
        RETURNING *
      `;

      return res.status(201).json({ ok: true, data: row });
    }

    if (req.method === "GET") {
      const rows = await sql`
        SELECT * FROM book_orders ORDER BY submitted_at DESC
      `;
      return res.status(200).json({ ok: true, data: rows });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed." });
  } catch (err) {
    console.error("[/api/book-orders]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
