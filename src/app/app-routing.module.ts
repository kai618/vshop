import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { AccountComponent } from './components/account/account.component';
import { NewProductFormComponent } from './components/admin/new-product-form/new-product-form.component';
import { ManagerGuard } from './guards/manager.guard';
import { ManagerStaffComponent } from './components/manager/manager-staff/manager-staff.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateProductFormComponent } from './components/admin/update-product-form/update-product-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/products/new',
    component: NewProductFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/products/:id',
    component: UpdateProductFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'manager/staff',
    component: ManagerStaffComponent,
    canActivate: [AuthGuard, ManagerGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
