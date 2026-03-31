import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../services/order';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="medieval-container">
      <h2 class="medieval-title">Royal Orders</h2>
      
      <div *ngIf="orders().length === 0" class="no-orders">
        No orders have been placed in the kingdom yet.
      </div>

      <div class="orders-grid" *ngIf="orders().length > 0">
        <div *ngFor="let order of orders()" class="order-card parchment">
          <div class="order-header">
            <h3>Order #{{ order.id }}</h3>
            <span class="user-id">Buyer ID: {{ order.userId }}</span>
          </div>
          <div class="products-list">
            <h4>Items:</h4>
            <ul>
              <li *ngFor="let name of order.productsNames; let i = index" class="product-item">
                <span>⚔ {{ name }}</span>
                <button (click)="removeItem(order.id!, order.productsIds![i])" 
                        class="remove-button" 
                        title="Remove from order">
                  Release Item
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .medieval-container {
      padding: 2rem;
      background-color: #2c1e14;
      min-height: 100vh;
      color: #f4e4bc;
    }
    .medieval-title {
      font-family: 'MedievalSharp', serif;
      text-align: center;
      font-size: 3rem;
      color: #d4af37;
      margin-bottom: 2rem;
    }
    .no-orders {
      text-align: center;
      font-size: 1.5rem;
      color: #bc9a6c;
      padding: 3rem;
    }
    .orders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }
    .parchment {
      background-color: #f4e4bc;
      color: #2c1e14;
      padding: 1.5rem;
      border: 3px solid #8b4513;
      border-radius: 4px;
      box-shadow: 5px 5px 15px rgba(0,0,0,0.5);
    }
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #8b4513;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }
    h3, h4 {
      margin: 0;
      color: #8b4513;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    .product-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.6rem;
      padding: 0.3rem;
      border-bottom: 1px dashed rgba(139, 69, 19, 0.2);
    }
    .remove-button {
      background: #8b4513;
      color: #f4e4bc;
      border: 1px solid #d4af37;
      padding: 2px 8px;
      font-size: 0.7rem;
      cursor: pointer;
      font-family: 'MedievalSharp', serif;
    }
    .remove-button:hover {
      background: #d00;
      color: #fff;
    }
  `]
})
export class OrderListComponent implements OnInit {
  orders = signal<Order[]>([]);

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (data) => {
        console.log('Orders loaded:', data);
        this.orders.set(data);
      },
      error: (err) => console.error('Failed to load orders', err)
    });
  }

  removeItem(orderId: number, productId: number) {
    if (confirm('Are you sure you want to release this item from the royal order?')) {
      this.orderService.removeProduct(orderId, productId).subscribe({
        next: () => {
          this.loadOrders();
        },
        error: (err) => alert('Failed to release item: ' + err.message)
      });
    }
  }
}
