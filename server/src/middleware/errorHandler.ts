import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function handleValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const first = errors.array()[0];
    const message =
      typeof first.msg === 'string' ? first.msg : 'Validation failed';
    return res.status(400).json({ message });
  }
  next();
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
