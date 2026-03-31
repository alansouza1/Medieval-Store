import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent],
  template: `
    <header class="medieval-header">
      <h1>Medieval Store</h1>
    </header>
    <main>
      <app-product-list></app-product-list>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .medieval-header {
      background-color: #3b2b1a;
      color: #d4af37;
      padding: 1.5rem;
      text-align: center;
      border-bottom: 5px double #d4af37;
      font-family: 'MedievalSharp', serif;
    }
    h1 {
      margin: 0;
      letter-spacing: 0.2rem;
      text-shadow: 1px 1px #000;
    }
  `]
})
export class AppComponent {
  title = 'frontend';
}
