# Codebox Deployment Guide

Step-by-step guide to deploy this Next.js project. The app uses **Clerk** (auth), **Neon** (PostgreSQL), **Drizzle ORM**, **Gemini AI**, and **Google Custom Search**.

---

## Prerequisites

- [ ] GitHub account (or GitLab/Bitbucket)
- [ ] Code pushed to a Git repository
- [ ] Accounts: [Vercel](https://vercel.com), [Clerk](https://clerk.com), [Neon](https://neon.tech)

---

## Step 1: Prepare Your Database (Neon)

1. Go to [neon.tech](https://neon.tech) and sign in.
2. Create a new project (e.g. `codebox-prod`).
3. Copy the **connection string** (looks like `postgresql://user:pass@host/dbname?sslmode=require`).
4. Save it — you'll use it as `DATABASE_URL`.

**Run migrations (if you have any):**
```bash
# From project root
npx drizzle-kit push
# Or: npx drizzle-kit migrate
```

---

## Step 2: Set Up Clerk (Authentication)

1. Go to [clerk.com](https://clerk.com) and create an application.
2. In **Clerk Dashboard** → **API Keys**, copy:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
3. Under **Configure** → **Domains**, add your production domain (e.g. `your-app.vercel.app`).

---

## Step 3: Get API Keys for Optional Features

| Variable | Where to get it | Required? |
|----------|-----------------|------------|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) | For AI features |
| `GOOGLE_SEARCH_API_KEY` | [Google Cloud Console](https://console.cloud.google.com) → APIs → Custom Search API | For study materials search |
| `GOOGLE_SEARCH_ENGINE_ID` | [Programmable Search Engine](https://programmablesearchengine.google.com) → Create → Copy Search engine ID | For study materials search |

---

## Step 4: Deploy to Vercel

### 4a. Connect Repository

1. Go to [vercel.com](https://vercel.com) and sign in (use GitHub).
2. Click **Add New** → **Project**.
3. Import your Git repository (e.g. `your-username/codebox`).
4. Vercel will detect Next.js automatically.

### 4b. Configure Environment Variables

In the Vercel project → **Settings** → **Environment Variables**, add:

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | Your Neon connection string | Production, Preview |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | From Clerk | Production, Preview |
| `CLERK_SECRET_KEY` | From Clerk | Production, Preview |
| `GEMINI_API_KEY` | From Google AI Studio | Production, Preview |
| `GOOGLE_SEARCH_API_KEY` | From Google Cloud | Production, Preview |
| `GOOGLE_SEARCH_ENGINE_ID` | From Programmable Search | Production, Preview |

### 4c. Deploy

1. Click **Deploy**.
2. Wait for the build to finish.
3. Your app will be live at `https://your-project.vercel.app`.

---

## Step 5: Post-Deploy Checklist

- [ ] Visit your deployed URL and sign in/sign up.
- [ ] Confirm database reads/writes work (e.g. enroll in a course).
- [ ] Test AI features (if `GEMINI_API_KEY` is set).
- [ ] Test study materials search (if Google Search keys are set).
- [ ] In Clerk, add your production domain under **Domains** if using a custom domain.

---

## Step 6: Custom Domain (Optional)

1. In Vercel → **Settings** → **Domains**, add your domain.
2. Follow DNS instructions (add CNAME or A record).
3. In Clerk → **Domains**, add the same domain.
4. Update `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` if Clerk gives you production-specific keys.

---

## Alternative: Deploy to Railway

1. Go to [railway.app](https://railway.app) and create a project.
2. Add **GitHub Repo** and connect your repository.
3. Add **PostgreSQL** service (or use Neon and add `DATABASE_URL`).
4. Add all environment variables in **Variables**.
5. Railway will build and deploy automatically.

---

## Alternative: Deploy with Docker

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

Add to `next.config.ts`:
```ts
const nextConfig = {
  output: 'standalone',
  // ... rest of config
};
```

Then build and run:
```bash
docker build -t codebox .
docker run -p 3000:3000 --env-file .env codebox
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails | Check `npm run build` locally. Fix TypeScript/lint errors. |
| "Database connection failed" | Verify `DATABASE_URL` and that Neon allows connections from Vercel IPs. |
| Clerk redirect loop | Add your Vercel domain in Clerk → Domains. |
| 404 on API routes | Ensure routes are under `app/api/` and exported correctly. |
| Study materials empty | Set `GOOGLE_SEARCH_API_KEY` and `GOOGLE_SEARCH_ENGINE_ID`. |

---

## Quick Reference: Required vs Optional Env Vars

**Required:**
- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

**Optional (features will degrade gracefully):**
- `GEMINI_API_KEY` — AI features
- `GOOGLE_SEARCH_API_KEY` + `GOOGLE_SEARCH_ENGINE_ID` — Study materials search
