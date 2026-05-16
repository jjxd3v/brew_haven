import cors, { CorsOptions } from 'cors';

const defaultOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

export function getAllowedOrigins(): string[] {
  const fromEnv = (process.env.CLIENT_URL || '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean);

  return [...new Set([...fromEnv, ...defaultOrigins])];
}

/** Vercel production + preview URLs for this project */
function isVercelBrewHavenOrigin(origin: string): boolean {
  try {
    const { hostname, protocol } = new URL(origin);
    return (
      protocol === 'https:' &&
      (hostname === 'brew-haven-ochre.vercel.app' ||
        /^brew-haven[a-z0-9-]*\.vercel\.app$/.test(hostname))
    );
  } catch {
    return false;
  }
}

export function isOriginAllowed(origin: string): boolean {
  const allowed = getAllowedOrigins();
  if (allowed.includes(origin)) return true;
  if (process.env.NODE_ENV === 'production' && isVercelBrewHavenOrigin(origin)) {
    return true;
  }
  return false;
}

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Same-origin or server-to-server (no Origin header)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (isOriginAllowed(origin)) {
      // With credentials: true, reflect the exact allowed origin
      callback(null, origin);
      return;
    }

    console.warn(`[cors] Blocked origin: ${origin}`);
    console.warn(`[cors] Allowed: ${getAllowedOrigins().join(', ')}`);
    callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 204,
  preflightContinue: false,
};

export const corsMiddleware = cors(corsOptions);
