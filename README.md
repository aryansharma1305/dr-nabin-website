# Dr. Nabin Kumar Yadav — Portfolio

A premium dark-luxury medical portfolio for **Dr. Nabin Kumar Yadav**, Gold Medalist Radiologist, Medical Educator, and Oncology Fellow. Built with React, Vite, Tailwind CSS, Framer Motion, and a Neon PostgreSQL backend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 7, Tailwind CSS 3 |
| Animations | Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll |
| Forms | React Hook Form + Zod validation |
| Database | Neon (serverless PostgreSQL) |
| Image uploads | Cloudinary (signed uploads via server-side API) |
| Deployment | Vercel (frontend + serverless API functions) |
| Dev API server | Express (local mirror of Vercel functions) |

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero, stats counter, about teaser, services preview, gold medal spotlight |
| `/about` | Full bio, timeline, education highlights, global reach, certificates gallery |
| `/services` | Bento grid — diagnostic radiology, education, oncology, research |
| `/publications` | Research papers with category filter, Google Scholar link |
| `/book-consultation` | 3-step form — saves to Neon DB |
| `/contact` | Contact form — saves to Neon DB |
| `/gallery` | Certificate and achievement image gallery |
| `/books` | Published books with order form |
| `/admin` | Password-protected dashboard — view consultations, messages, upload certificates |

---

## Project Structure

```
├── api/                        # Vercel serverless functions (also used by server.js)
│   ├── _db.js                  # Neon DB connection + table bootstrap
│   ├── _cloudinary.js          # Cloudinary signature helper
│   ├── consultations.js        # GET / POST / DELETE consultations
│   ├── messages.js             # GET / POST / PATCH / DELETE messages
│   ├── certificates.js         # GET / PUT / DELETE certificate images
│   ├── book-orders.js          # GET / POST book orders
│   └── cloudinary-signature.js # Signed upload endpoint
├── src/
│   ├── api/                    # Frontend fetch wrappers
│   │   ├── book-consultation.js
│   │   ├── contact.js
│   │   ├── certificates.js
│   │   └── book-orders.js
│   ├── assets/                 # Static images
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FloatingSocial.jsx
│   │   └── CustomCursor.jsx
│   └── pages/
│       ├── pageContent.js      # All site content (bio, services, publications…)
│       ├── Home.jsx
│       ├── About.jsx
│       ├── Services.jsx
│       ├── Publications.jsx
│       ├── BookConsultation.jsx
│       ├── Contact.jsx
│       ├── Gallery.jsx
│       ├── Books.jsx
│       └── Admin.jsx
├── server.js                   # Local Express dev API server
├── vercel.json                 # Vercel routing config
├── .env.example                # Environment variable template
└── vite.config.js              # Vite config with /api proxy
```

---

## Running Locally

### 1. Clone and install

```bash
git clone https://github.com/aryansharma1305/dr-nabin-website.git
cd dr-nabin-website
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_CERTIFICATE_FOLDER=dr-yadav-certificates
```

### 3. Start both servers

Open **two terminals**:

```bash
# Terminal 1 — API server (connects to Neon, runs on :3001)
npm run dev:api

# Terminal 2 — Vite frontend (runs on :5173, proxies /api to :3001)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Admin Dashboard

Go to [http://localhost:5173/admin](http://localhost:5173/admin)

**Password:** `dryadav2024`

Features:
- View all consultation requests from the Book Consultation form
- View all contact messages with unread indicators
- Mark messages as read, reply via email, delete records
- Upload certificate images to Cloudinary — they appear automatically on the About page

---

## Deploying to Vercel

### 1. Push to GitHub (already done)

### 2. Import project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `aryansharma1305/dr-nabin-website`
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

### 3. Add environment variables

In **Settings → Environment Variables**, add:

| Key | Value |
|---|---|
| `DATABASE_URL` | Your Neon connection string |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `CLOUDINARY_CERTIFICATE_FOLDER` | `dr-yadav-certificates` |

### 4. Redeploy

Go to **Deployments → ⋯ → Redeploy** after adding env vars.

---

## Database Schema

Tables are auto-created on first server start via `ensureTables()`.

```sql
-- Consultation requests from /book-consultation
consultations (id, first_name, last_name, email, phone, consult_type, timeframe, message, submitted_at)

-- Contact form messages from /contact
messages (id, name, email, subject, message, is_read, submitted_at)

-- Book orders from /books
book_orders (id, book_id, book_title, quantity, name, email, phone, address, submitted_at)

-- Certificate images uploaded via /admin
certificate_images (slot, title, issuer, image_url, public_id, uploaded_at)
```

---

## Design System

The UI follows the **Radiance** design system — dark luxury aesthetic inspired by Swiss horology and Apple hardware minimalism.

- **Primary:** Rich Gold `#D4A843` — branding, CTAs, borders
- **Secondary:** Electric Blue `#0EA5E9` — technical highlights, interactive states
- **Background:** Obsidian `#080B14` — infinite dark canvas
- **Typography:** Playfair Display (headlines) + Inter (body)
- **Effects:** Glassmorphism, grain overlay, aurora background, magnetic buttons, custom cursor

---

## Content Updates

All site content lives in `src/pages/pageContent.js` — bio, services, publications, social links. Edit that file to update any text without touching the components.

---

## License

Private — all rights reserved. Built for Dr. Nabin Kumar Yadav.
