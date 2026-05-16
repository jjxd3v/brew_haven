import { Response } from 'express';
import { Order } from '../models/Order.js';
import { AuthRequest } from '../middleware/auth.js';

function formatOrder(order: {
  _id: { toString(): string };
  userId: { toString(): string };
  itemName: string;
  price: number;
  image: string;
  quantity: number;
  createdAt: Date;
}) {
  return {
    id: order._id.toString(),
    userId: order.userId.toString(),
    itemName: order.itemName,
    price: order.price,
    image: order.image,
    quantity: order.quantity,
    createdAt: order.createdAt.toISOString(),
  };
}

export async function getOrders(req: AuthRequest, res: Response) {
  const orders = await Order.find({ userId: req.userId })
    .sort({ createdAt: -1 })
    .lean();
  res.json(orders.map(formatOrder));
}

export async function createOrder(req: AuthRequest, res: Response) {
  const { itemName, price, image, quantity } = req.body;
  const order = await Order.create({
    userId: req.userId,
    itemName,
    price,
    image,
    quantity,
  });
  res.status(201).json(formatOrder(order));
}

export async function deleteOrder(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const order = await Order.findOneAndDelete({ _id: id, userId: req.userId });
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json({ message: 'Order deleted' });
}

export async function clearOrders(req: AuthRequest, res: Response) {
  await Order.deleteMany({ userId: req.userId });
  res.json({ message: 'All orders cleared' });
}
