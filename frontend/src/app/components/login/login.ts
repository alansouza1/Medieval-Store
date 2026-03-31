import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="medieval-container">
      <div class="login-box parchment">
        <h2 class="medieval-title">Enter the Store</h2>
        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Hero's Name</label>
            <input type="text" id="username" name="username" [(ngModel)]="credentials.username" required>
          </div>
          <div class="form-group">
            <label for="password">Secret Scroll (Password)</label>
            <input type="password" id="password" name="password" [(ngModel)]="credentials.password" required>
          </div>
          <button type="submit" class="medieval-button" [disabled]="!loginForm.valid">Unlock Access</button>
          <p class="error-msg" *ngIf="errorMessage()">{{ errorMessage() }}</p>
        </form>
        <p class="switch-msg">No scroll? <a (click)="goToRegister()">Register your hero</a></p>
      </div>
    </div>
  `,
  styles: [`
    .medieval-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      background-color: #2c1e14;
    }
    .login-box {
      width: 100%;
      max-width: 400px;
      padding: 2.5rem;
      border: 5px double #d4af37;
      text-align: center;
    }
    .parchment {
      background-color: #f4e4bc;
      color: #2c1e14;
      border-radius: 4px;
    }
    .medieval-title {
      font-family: 'MedievalSharp', serif;
      font-size: 2.5rem;
      color: #8b4513;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
      text-align: left;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid #8b4513;
      background: rgba(255,255,255,0.5);
      border-radius: 4px;
      box-sizing: border-box;
    }
    .medieval-button {
      background-color: #8b4513;
      color: #d4af37;
      border: 2px solid #d4af37;
      padding: 1rem 2rem;
      font-family: 'MedievalSharp', serif;
      font-size: 1.2rem;
      cursor: pointer;
      width: 100%;
      margin-top: 1rem;
    }
    .medieval-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .error-msg {
      color: #d00;
      margin-top: 1rem;
      font-weight: bold;
    }
    .switch-msg {
      margin-top: 1.5rem;
    }
    a {
      color: #8b4513;
      text-decoration: underline;
      cursor: pointer;
    }
  `]
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = signal('');

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.userService.login(this.credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage.set(err.error?.message || 'Login failed, check your scroll.');
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
