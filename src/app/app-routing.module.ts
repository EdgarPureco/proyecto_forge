import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductsAdminComponent } from './pages/admin/products-admin/products-admin.component';
import { SuppliesComponent } from './pages/admin/supplies/supplies.component';
import { SuppliersComponent } from './pages/admin/suppliers/suppliers.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { CustomersComponent } from './pages/admin/customers/customers.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { AuthGuard } from './guards/auth.guard';  
import { Roles } from './models/roles';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { CustomerOrdersComponent } from './pages/customer-orders/customer-orders.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:"home", component: HomeComponent},
  {path:"products", component: ProductsComponent, canActivate : [AuthGuard] },
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"cart", component: CartComponent, canActivate : [AuthGuard]},
  {path:"myOrders", component: CustomerOrdersComponent, canActivate : [AuthGuard]},

  {path:"admin/dashboard", component: DashboardComponent, canActivate : [AuthGuard],
        data: { roles: [Roles.Admin, Roles.Seller, Roles.Stocker]}},

  {path:"admin/products", component: ProductsAdminComponent, canActivate : [AuthGuard],
        data: { roles: [Roles.Admin, Roles.Stocker]}},

  {path:"admin/orders", component: OrdersComponent, canActivate : [AuthGuard],
        data: { roles: [Roles.Admin, Roles.Seller]}},

  {path:"admin/supplies", component: SuppliesComponent, canActivate : [AuthGuard],
        data: { roles: [Roles.Admin, Roles.Stocker]}},

  {path:"admin/suppliers", component: SuppliersComponent, canActivate : [AuthGuard],
        data: { roles: [Roles.Admin, Roles.Stocker]}},

  {path:"admin/users", component: UsersComponent, canActivate : [AuthGuard],
        data: { roles: [Roles.Admin]}},

  {path:"admin/customers", component: CustomersComponent, canActivate : [AuthGuard],
        data: { roles: [Roles.Admin]}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
