/**
 * Local dev API server — mirrors the Vercel serverless functions.
 * Run with: node server.js  (or via npm run dev:api)
 * Vite proxies /api/* → http://localhost:3001
 */
import "dotenv/config";
import express from "express";
import cors from "cors";
import { neon } from "@neondatabase/serverless";
import { createCloudinarySignature, getCloudinaryConfig } from "./api/_cloudinary.js";

const app = express();
app.use(cors());
app.use(express.json());

const sql = neon(process.env.DATABASE_URL);

// ── Bootstrap tables ──────────────────────────────────────────────────────────
async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS consultations (
      id           BIGSERIAL PRIMARY KEY,
      first_name   TEXT        NOT NULL,
      last_name    TEXT        NOT NULL,
      email        TEXT        NOT NULL,
      phone        TEXT,
      modality     TEXT,
      consult_type TEXT        NOT NULL,
      timeframe    TEXT,
      message      TEXT,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`ALTER TABLE consultations ADD COLUMN IF NOT EXISTS modality TEXT`;
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id           BIGSERIAL PRIMARY KEY,
      name         TEXT        NOT NULL,
      email        TEXT        NOT NULL,
      subject      TEXT,
      message      TEXT        NOT NULL,
      is_read      BOOLEAN     NOT NULL DEFAULT FALSE,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS book_orders (
      id           BIGSERIAL PRIMARY KEY,
      book_id      TEXT        NOT NULL,
      book_title   TEXT        NOT NULL,
      quantity     INTEGER     NOT NULL DEFAULT 1,
      name         TEXT        NOT NULL,
      email        TEXT        NOT NULL,
      phone        TEXT,
      address      TEXT,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS certificate_images (
      slot        TEXT        PRIMARY KEY,
      title       TEXT        NOT NULL,
      issuer      TEXT,
      image_url   TEXT        NOT NULL,
      public_id   TEXT,
      uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS gallery_items (
      id          BIGSERIAL PRIMARY KEY,
      title       TEXT        NOT NULL,
      category    TEXT        NOT NULL,
      description TEXT,
      image_url   TEXT        NOT NULL,
      public_id   TEXT,
      uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  console.log("✅  Tables ready");
}

// ── /api/consultations ────────────────────────────────────────────────────────
app.post("/api/consultations", async (req, res) => {
  const { firstName, lastName, email, phone, modality, consultType, timeframe, message } = req.body;
  if (!firstName || !lastName || !email || !consultType)
    return res.status(400).json({ ok: false, error: "Missing required fields." });

  const [row] = await sql`
    INSERT INTO consultations (first_name, last_name, email, phone, modality, consult_type, timeframe, message)
    VALUES (${firstName}, ${lastName}, ${email}, ${phone || null}, ${modality || null}, ${consultType}, ${timeframe || null}, ${message || null})
    RETURNING *
  `;
  res.status(201).json({ ok: true, data: row });
});

// ── /api/book-orders ─────────────────────────────────────────────────────────
app.post("/api/book-orders", async (req, res) => {
  const { bookId, bookTitle, quantity, name, email, phone, address } = req.body;
  if (!bookId || !bookTitle || !name || !email)
    return res.status(400).json({ ok: false, error: "Missing required fields." });

  const [row] = await sql`
    INSERT INTO book_orders (book_id, book_title, quantity, name, email, phone, address)
    VALUES (${bookId}, ${bookTitle}, ${Number(quantity) || 1}, ${name}, ${email}, ${phone || null}, ${address || null})
    RETURNING *
  `;
  res.status(201).json({ ok: true, data: row });
});

app.get("/api/book-orders", async (_req, res) => {
  const rows = await sql`SELECT * FROM book_orders ORDER BY submitted_at DESC`;
  res.json({ ok: true, data: rows });
});

// ── /api/certificates ───────────────────────────────────────────────────────
app.get("/api/certificates", async (_req, res) => {
  const rows = await sql`SELECT * FROM certificate_images ORDER BY slot ASC`;
  res.json({ ok: true, data: rows });
});

app.put("/api/certificates", async (req, res) => {
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
  res.json({ ok: true, data: row });
});

app.delete("/api/certificates", async (req, res) => {
  const { slot } = req.query;
  if (!slot) return res.status(400).json({ ok: false, error: "slot required." });
  await sql`DELETE FROM certificate_images WHERE slot = ${slot}`;
  res.json({ ok: true });
});

// ── /api/gallery-items ──────────────────────────────────────────────────────
app.get("/api/gallery-items", async (_req, res) => {
  const rows = await sql`SELECT * FROM gallery_items ORDER BY uploaded_at DESC`;
  res.json({ ok: true, data: rows });
});

app.post("/api/gallery-items", async (req, res) => {
  const { title, category, description, imageUrl, publicId } = req.body;
  if (!title || !category || !imageUrl) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }

  const [row] = await sql`
    INSERT INTO gallery_items (title, category, description, image_url, public_id)
    VALUES (${title}, ${category}, ${description || null}, ${imageUrl}, ${publicId || null})
    RETURNING *
  `;
  res.status(201).json({ ok: true, data: row });
});

app.delete("/api/gallery-items", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ ok: false, error: "id required." });
  await sql`DELETE FROM gallery_items WHERE id = ${id}`;
  res.json({ ok: true });
});

// ── /api/cloudinary-signature ───────────────────────────────────────────────
app.post("/api/cloudinary-signature", async (_req, res) => {
  const { cloudName, apiKey, apiSecret, folder } = getCloudinaryConfig();

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ ok: false, error: "Cloudinary environment variables are not configured." });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signature = createCloudinarySignature({ folder, timestamp }, apiSecret);

  res.json({
    ok: true,
    data: {
      apiKey,
      cloudName,
      folder,
      signature,
      timestamp,
    },
  });
});

app.get("/api/consultations", async (_req, res) => {
  const rows = await sql`SELECT * FROM consultations ORDER BY submitted_at DESC`;
  res.json({ ok: true, data: rows });
});

app.delete("/api/consultations", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ ok: false, error: "id required." });
  await sql`DELETE FROM consultations WHERE id = ${id}`;
  res.json({ ok: true });
});

// ── /api/messages ─────────────────────────────────────────────────────────────
app.post("/api/messages", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ ok: false, error: "Missing required fields." });

  const [row] = await sql`
    INSERT INTO messages (name, email, subject, message)
    VALUES (${name}, ${email}, ${subject || null}, ${message})
    RETURNING *
  `;
  res.status(201).json({ ok: true, data: row });
});

app.get("/api/messages", async (_req, res) => {
  const rows = await sql`SELECT * FROM messages ORDER BY submitted_at DESC`;
  res.json({ ok: true, data: rows });
});

app.patch("/api/messages", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ ok: false, error: "id required." });
  const [row] = await sql`UPDATE messages SET is_read = TRUE WHERE id = ${id} RETURNING *`;
  res.json({ ok: true, data: row });
});

app.delete("/api/messages", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ ok: false, error: "id required." });
  await sql`DELETE FROM messages WHERE id = ${id}`;
  res.json({ ok: true });
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.API_PORT || 3001;
ensureTables()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀  API server → http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌  DB init failed:", err.message);
    process.exit(1);
  });
