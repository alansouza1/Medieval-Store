import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="medieval-container">
      <h2 class="medieval-title">Available Armory</h2>
      <div class="product-grid">
        <div *ngFor="let product of products" class="product-card">
          <div class="parchment">
            <h3>{{ product.name }}</h3>
            <p class="amount">Price: {{ product.amount }}</p>
            <p class="order-id" *ngIf="product.orderId">Order: #{{ product.orderId }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .medieval-container {
      padding: 2rem;
      background-color: #2c1e14;
      min-height: 80vh;
      color: #f4e4bc;
    }
    .medieval-title {
      font-family: 'MedievalSharp', serif;
      text-align: center;
      font-size: 3rem;
      color: #d4af37;
      text-shadow: 2px 2px #000;
      margin-bottom: 2rem;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }
    .product-card {
      background: #8b4513;
      padding: 10px;
      border: 3px solid #d4af37;
      border-radius: 8px;
      box-shadow: 5px 5px 15px rgba(0,0,0,0.5);
      transition: transform 0.3s;
    }
    .product-card:hover {
      transform: scale(1.05);
    }
    .parchment {
      background-color: #f4e4bc;
      color: #2c1e14;
      padding: 1.5rem;
      border-radius: 4px;
      min-height: 150px;
      border: 1px solid #bc9a6c;
    }
    h3 {
      margin-top: 0;
      border-bottom: 2px solid #8b4513;
      padding-bottom: 0.5rem;
    }
    .amount {
      font-weight: bold;
      color: #4a3728;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Failed to load products', err)
    });
  }
}
