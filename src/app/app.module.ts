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
import { AuthService } from './services/auth.service';
import { AccountComponent } from './components/account/account.component';
import { UserService } from './services/user.service';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { ManagerStaffComponent } from './components/manager/manager-staff/manager-staff.component';
import { RegisterComponent } from './components/register/register.component';
import { GgLoginButtonComponent } from './components/login/gg-login-button/gg-login-button.component';
import { FbLoginButtonComponent } from './components/login/fb-login-button/fb-login-button.component';
import { OauthRowComponent } from './components/login/oauth-row/oauth-row.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/register/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    AdminProductsComponent,
    LoginComponent,
    AccountComponent,
    ProductFormComponent,
    ManagerStaffComponent,
    RegisterComponent,
    GgLoginButtonComponent,
    FbLoginButtonComponent,
    OauthRowComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService, UserService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
