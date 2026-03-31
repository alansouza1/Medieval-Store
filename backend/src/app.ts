import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import ProductsRoutes from './routes/products.routes';
import UsersRoutes from './routes/users.routes';
import OrdersRoutes from './routes/orders.routes';
import * as swaggerDocument from '../swagger.json';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(ProductsRoutes);
app.use(UsersRoutes);
app.use(OrdersRoutes);

export default app;
