import { Router } from 'express';
import { body } from 'express-validator';
import {
  getOrders,
  createOrder,
  deleteOrder,
  clearOrders,
} from '../controllers/orderController.js';
import { requireAuth } from '../middleware/auth.js';
import { handleValidation } from '../middleware/errorHandler.js';

const router = Router();

router.use(requireAuth);

const createOrderValidation = [
  body('itemName').trim().notEmpty().withMessage('Item name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('image').trim().notEmpty().withMessage('Image is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

router.get('/', getOrders);
router.post('/', createOrderValidation, handleValidation, createOrder);
router.delete('/', clearOrders);
router.delete('/:id', deleteOrder);

export default router;
