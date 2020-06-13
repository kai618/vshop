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
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { ManagerPageComponent } from './components/manager/manager-page/manager-page.component';
import { ProductSearchComponent } from './components/admin/product-search/product-search.component';

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
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'products/new',
        component: NewProductFormComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'products/search',
        component: ProductSearchComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'products/:id',
        component: UpdateProductFormComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: '',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
    ],
  },
  {
    path: 'manager',
    component: ManagerPageComponent,
    canActivate: [AuthGuard, ManagerGuard],
    children: [
      {
        path: '',
        component: ManagerStaffComponent,
        canActivate: [AuthGuard, ManagerGuard],
      },
    ],
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
