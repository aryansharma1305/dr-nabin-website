# Dr. Nabin Kumar Yadav — Medical Portfolio

> Freelance project — Premium dark-luxury portfolio website for a Gold Medalist Radiologist, Medical Educator, and Oncology Fellow.

---

## Overview

A fully custom, production-ready portfolio built from scratch for a medical professional. The design follows a **dark luxury** aesthetic — think Swiss horology meets Apple hardware minimalism — with smooth animations, glassmorphism UI, and a complete backend for form submissions and media management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 7, Tailwind CSS 3 |
| Animations | Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll |
| Forms | React Hook Form + Zod validation |
| Database | Neon (serverless PostgreSQL) |
| Image uploads | Cloudinary (signed server-side uploads) |
| Deployment | Vercel |

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero, animated stats counter, about teaser, services preview |
| `/about` | Full bio, career timeline, education highlights, global reach |
| `/services` | Bento grid — diagnostic radiology, education, oncology, research |
| `/publications` | Research papers with category filter, Google Scholar integration |
| `/book-consultation` | 3-step booking form with validation |
| `/contact` | Contact form |
| `/gallery` | Certificate and achievement gallery |
| `/books` | Published books with order form |

---

## Project Structure

```
├── api/                        # Serverless API functions (Vercel)
│   ├── _db.js                  # Neon DB connection + table bootstrap
│   ├── _cloudinary.js          # Cloudinary signature helper
│   ├── consultations.js        # Consultation requests CRUD
│   ├── messages.js             # Contact messages CRUD
│   ├── certificates.js         # Certificate image management
│   ├── book-orders.js          # Book order handling
│   └── cloudinary-signature.js # Signed upload endpoint
├── src/
│   ├── api/                    # Frontend fetch wrappers
│   ├── assets/                 # Static images
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FloatingSocial.jsx
│   │   └── CustomCursor.jsx
│   └── pages/
│       ├── pageContent.js      # All site content — edit here for updates
│       └── ...                 # Page components
├── server.js                   # Local Express dev API server
├── vercel.json                 # Vercel routing config
└── .env.example                # Environment variable template
```

---

## Local Development

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

Fill in `.env`:

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_CERTIFICATE_FOLDER=dr-yadav-certificates
```

### 3. Start dev servers

```bash
# Terminal 1 — API server (port 3001)
npm run dev:api

# Terminal 2 — Vite frontend (port 5173)
npm run dev
```

---

## Deployment (Vercel)

1. Import repo at [vercel.com/new](https://vercel.com/new)
2. Framework: **Vite** — build command `npm run build`, output `dist`
3. Add environment variables in **Settings → Environment Variables**:

| Key | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `CLOUDINARY_CERTIFICATE_FOLDER` | Upload folder name |

4. Redeploy after adding vars

---

## Database Schema

Tables are auto-created on first deploy.

```sql
consultations   (id, first_name, last_name, email, phone, consult_type, timeframe, message, submitted_at)
messages        (id, name, email, subject, message, is_read, submitted_at)
book_orders     (id, book_id, book_title, quantity, name, email, phone, address, submitted_at)
certificate_images (slot, title, issuer, image_url, public_id, uploaded_at)
```

---

## Design System

- **Primary:** Rich Gold `#D4A843`
- **Secondary:** Electric Blue `#0EA5E9`
- **Background:** Obsidian `#080B14`
- **Headlines:** Playfair Display
- **Body:** Inter

---

## Content Updates

All text content (bio, services, publications, social links) lives in `src/pages/pageContent.js`. Edit that file to update any copy without touching the components.

---

## Built by

[Aryan Sharma](https://github.com/aryansharma1305)
