import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';

const router = Router();

const ordersController = new OrdersController();

router.get('/orders', ordersController.getAll);
router.post('/orders', ordersController.create);

export default router;