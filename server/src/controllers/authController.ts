import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { formatUser } from '../utils/formatUser.js';
import { cookieOptions, clearCookieOptions } from '../utils/cookieOptions.js';
import { AuthRequest } from '../middleware/auth.js';

function signToken(userId: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashed,
  });

  const token = signToken(user._id.toString());
  res.cookie('token', token, cookieOptions);
  res.status(201).json(formatUser(user));
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = signToken(user._id.toString());
  res.cookie('token', token, cookieOptions);
  res.json(formatUser(user));
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie('token', clearCookieOptions);
  res.json({ message: 'Logged out' });
}

export async function me(req: AuthRequest, res: Response) {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findById(req.userId);
  if (!user) {
    res.clearCookie('token', clearCookieOptions);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.json(formatUser(user));
}
