import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  template: `
    <header class="medieval-header">
      <div class="header-content">
        <h1 (click)="goHome()" style="cursor: pointer;">Medieval Store</h1>
        <nav *ngIf="isLoggedIn()">
          <button (click)="logout()" class="nav-button">Leave Store (Logout)</button>
        </nav>
      </div>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .medieval-header {
      background-color: #3b2b1a;
      color: #d4af37;
      padding: 1rem 2.5rem;
      border-bottom: 5px double #d4af37;
      font-family: 'MedievalSharp', serif;
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      margin: 0;
      letter-spacing: 0.2rem;
      text-shadow: 1px 1px #000;
    }
    .nav-button {
      background: none;
      border: 1px solid #d4af37;
      color: #d4af37;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-family: 'MedievalSharp', serif;
    }
    .nav-button:hover {
      background: #d4af37;
      color: #3b2b1a;
    }
    main {
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  goHome() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/products']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
