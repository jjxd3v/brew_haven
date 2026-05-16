import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPaths = [
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../.env'),
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
];

let loadedFrom: string | null = null;

// Render/Vercel inject env vars directly; only load .env files when needed (e.g. local dev)
if (!process.env.MONGODB_URI) {
  for (const envPath of envPaths) {
    if (!fs.existsSync(envPath)) continue;
    const result = dotenv.config({ path: envPath, override: true });
    if (!result.error && process.env.MONGODB_URI) {
      loadedFrom = envPath;
      break;
    }
  }
} else {
  loadedFrom = 'process environment';
}

if (!process.env.MONGODB_URI) {
  console.error(
    '[env] MONGODB_URI is missing. Set it in Render environment variables or in BrewHaven/.env\nTried:\n' +
      envPaths.map((p) => `  - ${p}`).join('\n')
  );
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
const target = uri.includes('mongodb+srv')
  ? uri.split('@')[1]?.split('/')[0] ?? 'Atlas'
  : uri.includes('127.0.0.1')
    ? '127.0.0.1:27017 (local — is MongoDB running?)'
    : uri;

console.log(`[env] Loaded: ${loadedFrom ?? 'unknown'}`);
console.log(`[env] MongoDB target: ${target}`);
