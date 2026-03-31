import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
