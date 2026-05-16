import type { CookieOptions } from 'express';

const isProduction = process.env.NODE_ENV === 'production';
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
// Vercel + Render are different domains — cookies need SameSite=None
const isCrossOriginDeploy =
  isProduction && !clientUrl.includes('localhost');

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isCrossOriginDeploy ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const clearCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isCrossOriginDeploy ? 'none' : 'lax',
};
