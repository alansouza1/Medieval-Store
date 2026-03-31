import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { OrderListComponent } from './components/order-list/order-list';
import { authGuard } from './guards/auth/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
