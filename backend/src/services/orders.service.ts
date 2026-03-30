import connection from '../models/connection';
import OrderModel from '../models/order.model';
import ProductModel from '../models/product.model';
import Order from '../interfaces/order.interface';
import Product from '../interfaces/product.interface';

class OrderService {
  public model: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    const products = await this.productModel.getAll();
    const ordersWithProducts = orders.map(({ id, userId }) => {
      const filteredProducts = products.filter(({ orderId }) => orderId === id);

      const productsIds = filteredProducts.map((product: Product) => product.id);

      return {
        id,
        userId,
        productsIds,
      };
    });
    return ordersWithProducts;
  }
}

export default OrderService;