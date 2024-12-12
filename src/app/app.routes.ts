import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/gaurds/auth-guards';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { 
    path: 'login', 
    component: LoginComponent 
  },
  
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  
 
  {
    path: '',
    component: LayoutComponent, 
    canActivate: [AuthGuard],
    children: [
      {
        path: 'all-products',
        loadComponent: () =>
          import('./features/product/all-product/all-products.component').then(
            (m) => m.AllProductsComponent
          ),
      },
      {
        path: 'add-product',
        loadComponent: () =>
          import('./features/product/add-product/add-product/add-product.component').then(
            (m) => m.AddProductComponent
          ),
      },
      {
        path: 'edit-product/:_id',
        loadComponent: () =>
          import('./features/product/add-product/add-product/add-product.component').then(
            (m) => m.AddProductComponent
          ),
      },
    ],
  },

 
  { path: '**', redirectTo: 'login' },
];
