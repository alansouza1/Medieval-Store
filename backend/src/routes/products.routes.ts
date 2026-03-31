import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

const productsController = new ProductsController();

router.get('/products', productsController.getAll);
router.post('/products', authMiddleware, productsController.create);

export default router;