import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';

const router = Router();

const ordersController = new OrdersController();

router.get('/orders', ordersController.getAll);
router.post('/orders', ordersController.create);
router.delete('/orders/:orderId/items/:productId', ordersController.removeProduct);

export default router;