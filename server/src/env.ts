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

for (const envPath of envPaths) {
  if (!fs.existsSync(envPath)) continue;
  const result = dotenv.config({ path: envPath, override: true });
  if (!result.error && process.env.MONGODB_URI) {
    loadedFrom = envPath;
    break;
  }
}

if (!process.env.MONGODB_URI) {
  console.error(
    '[env] MONGODB_URI is missing. Create BrewHaven/.env or server/.env with your Atlas connection string.\nTried:\n' +
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
