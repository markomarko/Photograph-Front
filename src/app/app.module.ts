import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CustomerComponent } from './customer/customer.component';
import { PricingComponent } from './pricing/pricing.component';
import { DataService } from './shared/dataServices';
import { AuthGuard } from './auth/auth-guard.service';
import { RoleConstants } from './shared/role-constants';
import { AuthService } from './auth/auth.service';
import { NavbarComponent } from './home/navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AlbumComponent } from './gallery/album/album.component';




const ChildRoutes = [
  {
    path: 'Gallery',
    component: GalleryComponent,
    canActivate: [AuthGuard],
    data: { roles: [RoleConstants.adminRole, RoleConstants.subscriberRole] }
  },
  {
    path: 'Gallery/Album/:id',
    component: AlbumComponent,
    canActivate: [AuthGuard],
    data: { roles: [RoleConstants.adminRole, RoleConstants.subscriberRole] }
  }
];

const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { roles: [RoleConstants.anonymousRole] }
  },
  {
    path: 'Register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: [RoleConstants.anonymousRole] }
  },
  {
    path: 'Home',
    component: HomeComponent,
    children: ChildRoutes,
    canActivate: [AuthGuard],
    data: { roles: [RoleConstants.adminRole, RoleConstants.subscriberRole] }
  },
  {
    path: 'Pricing',
    component: PricingComponent,
    canActivate: [AuthGuard],
    data: { roles: [RoleConstants.adminRole, RoleConstants.subscriberRole] }
  },
  {
    path: 'Welcome',
    component: WelcomeComponent
  },
  { path: '**', redirectTo: '/Login' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GalleryComponent,
    AlbumComponent,
    CustomerComponent,
    PricingComponent,
    NavbarComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
