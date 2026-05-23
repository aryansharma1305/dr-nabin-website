import { neon } from "@neondatabase/serverless";

let _sql = null;

export function getDb() {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL environment variable is not set.");
    _sql = neon(url);
  }
  return _sql;
}

/**
 * Run once on cold start to ensure tables exist.
 * Neon is serverless so we use IF NOT EXISTS — safe to call every time.
 */
export async function ensureTables() {
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS consultations (
      id          BIGSERIAL PRIMARY KEY,
      first_name  TEXT        NOT NULL,
      last_name   TEXT        NOT NULL,
      email       TEXT        NOT NULL,
      phone       TEXT,
      modality    TEXT,
      consult_type TEXT       NOT NULL,
      timeframe   TEXT,
      message     TEXT,
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
}
