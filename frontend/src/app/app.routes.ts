import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { OrderListComponent } from './components/order-list/order-list';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
