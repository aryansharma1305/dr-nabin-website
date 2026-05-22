/**
 * Local dev API server — mirrors the Vercel serverless functions.
 * Run with: node server.js  (or via npm run dev:api)
 * Vite proxies /api/* → http://localhost:3001
 */
import "dotenv/config";
import express from "express";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

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
      consult_type TEXT        NOT NULL,
      timeframe    TEXT,
      message      TEXT,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
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
  console.log("✅  Tables ready");
}

// ── /api/consultations ────────────────────────────────────────────────────────
app.post("/api/consultations", async (req, res) => {
  const { firstName, lastName, email, phone, consultType, timeframe, message } = req.body;
  if (!firstName || !lastName || !email || !consultType)
    return res.status(400).json({ ok: false, error: "Missing required fields." });

  const [row] = await sql`
    INSERT INTO consultations (first_name, last_name, email, phone, consult_type, timeframe, message)
    VALUES (${firstName}, ${lastName}, ${email}, ${phone || null}, ${consultType}, ${timeframe || null}, ${message || null})
    RETURNING *
  `;
  res.status(201).json({ ok: true, data: row });
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
