import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="medieval-container">
      <h2 class="medieval-title">Available Armory</h2>
      
      <div *ngIf="products().length === 0" class="no-products">
        <h1>THE ARMORY IS EMPTY!</h1>
        <p>Our blacksmiths are still working on the weapons...</p>
      </div>

      <div class="selection-info" *ngIf="selectedIds().length > 0">
        <p>{{ selectedIds().length }} item(s) selected for your quest.</p>
        <button (click)="placeOrder()" class="medieval-button">Forge Royal Order</button>
      </div>

      <div class="product-grid" *ngIf="products().length > 0">
        <div *ngFor="let product of products()" 
             class="product-card" 
             [class.selected]="isSelected(product.id!)"
             [class.sold]="product.orderId"
             (click)="toggleSelection(product)">
          <div class="parchment">
            <div class="sold-ribbon" *ngIf="product.orderId">CLAIMED</div>
            <h3>{{ product.name }}</h3>
            <p class="amount">Price: {{ product.amount }}</p>
            <p class="order-id" *ngIf="product.orderId">Order: #{{ product.orderId }}</p>
            <p class="select-hint" *ngIf="!product.orderId && !isSelected(product.id!)">Click to select</p>
            <p class="select-hint selected" *ngIf="isSelected(product.id!)">READY FOR ORDER</p>
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
    .selection-info {
      background: #8b4513;
      padding: 1rem;
      border: 2px solid #d4af37;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 10px;
      z-index: 10;
    }
    .medieval-button {
      background-color: #d4af37;
      color: #2c1e14;
      border: 1px solid #000;
      padding: 0.5rem 1.5rem;
      font-family: 'MedievalSharp', serif;
      font-weight: bold;
      cursor: pointer;
    }
    .medieval-button:hover {
      background-color: #f4e4bc;
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
      cursor: pointer;
      position: relative;
    }
    .product-card.selected {
      border-color: #fff;
      box-shadow: 0 0 15px #d4af37;
    }
    .product-card.sold {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .sold-ribbon {
      background: #800;
      color: #fff;
      position: absolute;
      top: 10px;
      right: -10px;
      padding: 2px 10px;
      transform: rotate(20deg);
      font-size: 0.8rem;
      font-weight: bold;
    }
    .parchment {
      background-color: #f4e4bc;
      color: #2c1e14;
      padding: 1.5rem;
      border-radius: 4px;
      min-height: 150px;
    }
    .select-hint {
      font-size: 0.8rem;
      margin-top: 1rem;
      font-style: italic;
      color: #8b4513;
    }
    .select-hint.selected {
      color: #006400;
      font-weight: bold;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  selectedIds = signal<number[]>([]);

  constructor(
    private productService: ProductService, 
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Failed to load products', err)
    });
  }

  toggleSelection(product: Product) {
    if (product.orderId) return;
    
    const id = product.id!;
    const current = this.selectedIds();
    if (current.includes(id)) {
      this.selectedIds.set(current.filter(i => i !== id));
    } else {
      this.selectedIds.set([...current, id]);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedIds().includes(id);
  }

  placeOrder() {
    const ids = this.selectedIds();
    if (ids.length === 0) return;

    this.orderService.create(ids).subscribe({
      next: () => {
        this.selectedIds.set([]);
        this.router.navigate(['/orders']);
      },
      error: (err) => alert('Failed to forge the order: ' + err.error?.message)
    });
  }
}
