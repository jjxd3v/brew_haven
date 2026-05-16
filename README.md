# Brew Haven

MERN stack coffee shop app: React + Vite client, Express + MongoDB API.

## Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

## Setup

1. Install dependencies:

   ```bash
   npm run install:all
   ```

2. Copy environment files:

   ```bash
   cp .env.example .env
   cp client/.env.example client/.env
   ```

3. Edit `.env` in the project root:
   - `MONGODB_URI` — e.g. `mongodb://127.0.0.1:27017/brewhaven` or your Atlas connection string
   - `JWT_SECRET` — a long random string for production
   - `CLIENT_URL` — `http://localhost:5173` (Vite dev server)
   - `PORT` — `5000` (API server)

4. Start MongoDB locally (if not using Atlas).

5. Run both client and server:

   ```bash
   npm run dev
   ```

- Client: http://localhost:5173
- API: http://localhost:5000/api

The Vite dev server proxies `/api` to the Express server.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API + client concurrently |
| `npm run install:all` | Install deps in `server/` and `client/` |
| `npm run build` | Build client for production |

## MongoDB Atlas

1. Create a free cluster and database user.
2. Allow your IP in Network Access.
3. Copy the connection string into `MONGODB_URI` in `.env`.

## Deploy API on Render

| Setting | Value |
|---------|--------|
| Root Directory | `server` |
| Build Command | `npm install && npm run build` (types are in `dependencies` so Render can compile) |
| Start Command | `npm start` |

Set environment variables in Render: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `NODE_ENV=production`.

Example for Vercel + Render:

```env
# Render
CLIENT_URL=https://brew-haven-ochre.vercel.app
NODE_ENV=production

# Vercel
VITE_API_URL=https://brewhaven-api.onrender.com/api
```

`CLIENT_URL` must match your Vercel URL exactly. You can allow local dev too:

```env
CLIENT_URL=https://brew-haven-ochre.vercel.app,http://localhost:5173
```

## Repository

https://github.com/jjxd3v/brew_haven
