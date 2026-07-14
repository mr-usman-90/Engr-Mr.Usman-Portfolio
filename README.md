# Engr. Mr. Usman — Portfolio

Premium, performance-first portfolio (Hero section live).

## Stack

| Layer | Tech |
|--------|------|
| Frontend | SvelteKit · TypeScript · Tailwind CSS · GSAP · Lucide · Vite |
| Backend | Fastify · TypeScript · Zod · Prisma |
| Database | PostgreSQL |

## Project structure

```
├── frontend/   # SvelteKit app (Hero UI)
└── backend/    # Fastify API + Prisma
```

---

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open: **http://localhost:5173**

Build for production:

```bash
cd frontend
npm run build
npm run preview
```

---

## Run Backend

1. Start PostgreSQL and create a database named `portfolio` (or update `.env`).

2. Configure `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio?schema=public"
PORT=3001
HOST=0.0.0.0
```

3. Generate Prisma client & push schema:

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
```

4. Start API:

```bash
npm run dev
```

- Health: **http://localhost:3001/health** (DB ke bina bhi chal jata hai)
- Contact: `POST http://localhost:3001/api/contact` (PostgreSQL + `db push` ke baad)

```json
{
  "name": "Visitor",
  "email": "visitor@email.com",
  "subject": "Hello",
  "message": "I would like to discuss a project."
}
```

### Quick start (dono saath)

Terminal 1:

```bash
cd frontend && npm run dev
```

Terminal 2:

```bash
cd backend && npm run dev
```

---

## Notes

- `frontend/static/profile.png` apni real photo se replace karein.
- CV ke liye `frontend/static/cv.pdf` add karein.
- Social links: `frontend/src/lib/components/Hero.svelte`
- Navbar centered + **narrow width** (~920px); links beech mein.
- Background code aur hero center content dono **vertically centered** hain.
