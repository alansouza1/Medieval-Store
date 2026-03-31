import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Orders');
    const [rows] = result;
    return rows as Order[];
  }

  public async create(userId: number): Promise<number> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    return result.insertId;
  }

  public async deleteIfEmpty(orderId: number): Promise<void> {
    // Note: This logic assumes if NO products have this orderId, it's empty.
    const [rows] = await this.connection.execute(
      'SELECT id FROM Trybesmith.Products WHERE orderId = ?',
      [orderId],
    );
    const products = rows as any[];
    if (products.length === 0) {
      await this.connection.execute(
        'DELETE FROM Trybesmith.Orders WHERE id = ?',
        [orderId],
      );
    }
  }
}