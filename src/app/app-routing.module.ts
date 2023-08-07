import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductsAdminComponent } from './pages/admin/products-admin/products-admin.component';
import { SuppliesComponent } from './pages/admin/supplies/supplies.component';
import { SupliersComponent } from './pages/admin/supliers/supliers.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { CustomersComponent } from './pages/admin/customers/customers.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { AuthGuard } from './guards/auth.guard';  

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:"home", component: HomeComponent},
  {path:"products", component: ProductsComponent},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"mycart", component: CartComponent},
  {path:"admin/dashboard", component: DashboardComponent, canActivate : [AuthGuard]},
  {path:"admin/products", component: ProductsAdminComponent, canActivate : [AuthGuard]},
  {path:"admin/supplies", component: SuppliesComponent, canActivate : [AuthGuard]},
  {path:"admin/suppliers", component: SupliersComponent, canActivate : [AuthGuard]},
  {path:"admin/users", component: UsersComponent, canActivate : [AuthGuard]},
  {path:"admin/customers", component: CustomersComponent, canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
