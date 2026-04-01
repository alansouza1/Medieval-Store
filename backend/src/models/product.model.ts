import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as Product[];
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  public async updateOrder(productId: number, orderId: number): Promise<void> {
    await this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [orderId, productId],
    );
  }

  public async removeFromOrder(productId: number): Promise<void> {
    await this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId = NULL WHERE id = ?',
      [productId],
    );
  }

  public async deleteByOrder(orderId: number): Promise<void> {
    await this.connection.execute(
      'DELETE FROM Trybesmith.Products WHERE orderId = ?',
      [orderId],
    );
  }
}