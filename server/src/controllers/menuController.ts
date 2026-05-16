import { Request, Response } from 'express';
import { MenuItem } from '../models/MenuItem.js';

export async function getMenu(_req: Request, res: Response) {
  const items = await MenuItem.find().sort({ id: 1 }).lean();
  res.json(
    items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
    }))
  );
}
