import { Request, Response } from 'express';
import OrderService from '../services/orders.service';

class OrdersController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };
}

export default OrdersController;