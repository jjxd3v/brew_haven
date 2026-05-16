import mongoose, { Schema, Document } from 'mongoose';

export type MenuCategory = 'Hot Coffee' | 'Cold Coffee' | 'Pastries';

export interface IMenuItem extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
}

const menuItemSchema = new Schema<IMenuItem>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: {
    type: String,
    enum: ['Hot Coffee', 'Cold Coffee', 'Pastries'],
    required: true,
  },
});

export const MenuItem = mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
