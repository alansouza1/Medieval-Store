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

  public async create(userId: number, productsIds: number[]): Promise<Order> {
    const orderId = await this.model.create(userId);
    
    const updatePromises = productsIds.map((productId) => 
      this.productModel.updateOrder(productId, orderId));
    
    await Promise.all(updatePromises);

    return { id: orderId, userId, productsIds };
  }
}

export default OrderService;