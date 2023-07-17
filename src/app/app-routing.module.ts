import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductsAdminComponent } from './pages/admin/products-admin/products-admin.component';
import { NewProductComponent } from './pages/admin/new-product/new-product.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { SuppliesComponent } from './pages/admin/supplies/supplies.component';
import { NewSuplierComponent } from './pages/admin/new-suplier/new-suplier.component';
import { EditSuplierComponent } from './pages/admin/edit-suplier/edit-suplier.component';
import { EditSupplyComponent } from './pages/admin/edit-supply/edit-supply.component';
import { NewSupplyComponent } from './pages/admin/new-supply/new-supply.component';
import { SupliersComponent } from './pages/admin/supliers/supliers.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { NewUserComponent } from './pages/admin/new-user/new-user.component';
import { CustomersComponent } from './pages/admin/customers/customers.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:"home", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"mycart", component: CartComponent},
  {path:"admin/dashboard", component: DashboardComponent},
  {path:"admin/products", component: ProductsAdminComponent},
  {path:"admin/new-product", component: NewProductComponent},
  {path:"admin/edit-product", component: EditProductComponent},
  {path:"admin/supplies", component: SuppliesComponent},
  {path:"admin/new-supply", component: NewSupplyComponent},
  {path:"admin/edit-supply", component: EditSupplyComponent},
  {path:"admin/suppliers", component: SupliersComponent},
  {path:"admin/new-supplier", component: NewSuplierComponent},
  {path:"admin/edit-supplier", component: EditSuplierComponent},
  {path:"admin/users", component: UsersComponent},
  {path:"admin/new-user", component: NewUserComponent},
  {path:"admin/customers", component: CustomersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
