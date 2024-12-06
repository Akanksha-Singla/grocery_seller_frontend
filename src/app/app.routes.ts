import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AllProductsComponent } from './views/all-products/all-products.component';
export const routes: Routes = [
{path:'',redirectTo:'login',pathMatch:"full"},

{
    path:'login',
    component:LoginComponent
},

{
    path:'register',
    component:RegisterComponent

},
{
    path:'all-products',
    component:AllProductsComponent

}
];
