import express from 'express';
import cors from 'cors';
import ProductsRoutes from './routes/products.routes';
import UsersRoutes from './routes/users.routes';
import OrdersRoutes from './routes/orders.routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use(ProductsRoutes);
app.use(UsersRoutes);
app.use(OrdersRoutes);

export default app;
