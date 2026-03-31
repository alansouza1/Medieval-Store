import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

const ordersController = new OrdersController();

router.get('/orders', authMiddleware, ordersController.getAll);
router.post('/orders', authMiddleware, ordersController.create);
router.delete('/orders/:orderId/items/:productId', authMiddleware, ordersController.removeProduct);

export default router;