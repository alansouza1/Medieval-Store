import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="medieval-container">
      <h2 class="medieval-title">Available Armory</h2>
      
      <!-- Show this if the signal is empty -->
      <div *ngIf="products().length === 0" class="no-products">
        <h1>THE ARMORY IS EMPTY!</h1>
        <p>Our blacksmiths are still working on the weapons...</p>
        <p>Wait... check the console! If items are there, we have a rendering ghost!</p>
      </div>

      <!-- Show the grid if the signal has data -->
      <div class="product-grid" *ngIf="products().length > 0">
        <div *ngFor="let product of products()" class="product-card">
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
      min-height: 100vh;
      color: #f4e4bc;
    }
    .no-products {
      text-align: center;
      padding: 3rem;
      color: #bc9a6c;
    }
    .medieval-title {
      font-family: 'MedievalSharp', serif;
      text-align: center;
      font-size: 3rem;
      color: #d4af37;
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
    }
    .parchment {
      background-color: #f4e4bc;
      color: #2c1e14;
      padding: 1.5rem;
      border-radius: 4px;
    }
  `]
})
export class ProductListComponent implements OnInit {
  // Using a Signal for reactive data binding
  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        console.log('Products received in component:', data);
        this.products.set(data); // Updating the Signal
      },
      error: (err) => console.error('Failed to load products', err)
    });
  }
}
