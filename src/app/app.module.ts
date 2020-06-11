import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { NewProductFormComponent } from './components/admin/new-product-form/new-product-form.component';
import { ManagerStaffComponent } from './components/manager/manager-staff/manager-staff.component';
import { RegisterComponent } from './components/register/register.component';
import { GgLoginButtonComponent } from './components/login/gg-login-button/gg-login-button.component';
import { FbLoginButtonComponent } from './components/login/fb-login-button/fb-login-button.component';
import { OauthRowComponent } from './components/login/oauth-row/oauth-row.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/register/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductFormComponent } from './components/admin/update-product-form/update-product-form.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { PieChartComponent } from './components/admin/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { UserActionButtonComponent } from './components/manager/user-action-button/user-action-button.component';
import { AdminActionButtonComponent } from './components/manager/admin-action-button/admin-action-button.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    AdminProductsComponent,
    LoginComponent,
    AccountComponent,
    NewProductFormComponent,
    ManagerStaffComponent,
    RegisterComponent,
    GgLoginButtonComponent,
    FbLoginButtonComponent,
    OauthRowComponent,
    LoginFormComponent,
    RegisterFormComponent,
    NewProductFormComponent,
    UpdateProductFormComponent,
    LoadingBarComponent,
    PieChartComponent,
    UserActionButtonComponent,
    AdminActionButtonComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ChartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
