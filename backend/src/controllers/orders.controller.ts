import { Request, Response } from 'express';
import OrderService from '../services/orders.service';

class OrdersController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds } = req.body;
    // Assuming auth middleware adds user to req
    // For now, let's use a default userId or get it from a potential payload
    // If we had an auth middleware, it would be req.user.id
    const userId = 1; 

    if (!productsIds) {
      return res.status(400).json({ message: '"productsIds" is required' });
    }
    if (!Array.isArray(productsIds)) {
      return res.status(422).json({ message: '"productsIds" must be an array' });
    }
    if (productsIds.length === 0) {
      return res.status(422).json({ message: '"productsIds" must include at least one id' });
    }

    const order = await this.orderService.create(userId, productsIds);
    res.status(201).json(order);
  };

  public removeProduct = async (req: Request, res: Response) => {
    const { orderId, productId } = req.params;
    await this.orderService.removeProduct(Number(orderId), Number(productId));
    res.status(204).end();
  };
}

export default OrdersController;