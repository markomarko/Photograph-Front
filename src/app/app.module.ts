import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
import { ToDateTimePipe } from './shared/toDateTimePipe';
import { AlbumComponent } from './gallery/album/album.component';
import { ProfileComponent } from './profile/profile.component';
import { Step1Component } from './auth/register/step1/step1.component';
import { Step2Component } from './auth/register/step2/step2.component';
import { Step3Component } from './auth/register/step3/step3.component';
import { Step4Component } from './auth/register/step4/step4.component';
import { Step5Component } from './auth/register/step5/step5.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { ModalComponent } from './suspendedUserModal/modal.component';
import { SuspendedUserModalService } from './suspendedUserModal/suspendedUserModal.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const HomeChildRoutes = [
  { path: 'Dashboard', component: HomeComponent },
  { path: 'Customer', component: CustomerComponent },
  {
    path: 'Gallery',
    component: GalleryComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        RoleConstants.adminRole,
        RoleConstants.subscriberRole,
        RoleConstants.clientRole
      ]
    }
  },
  {
    path: 'Gallery/Album/:id',
    component: AlbumComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        RoleConstants.adminRole,
        RoleConstants.subscriberRole,
        RoleConstants.clientRole
      ]
    }
  },
  {
    path: 'Customer',
    component: CustomerComponent,
    canActivate: [AuthGuard],
    data: { roles: [RoleConstants.adminRole, RoleConstants.subscriberRole] }
  },
  {
    path: 'Profile/:id',
    component: ProfileComponent,
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
    children: HomeChildRoutes,
    canActivate: [AuthGuard],
    data: {
      roles: [
        RoleConstants.adminRole,
        RoleConstants.subscriberRole,
        RoleConstants.clientRole
      ]
    }
  },
  {
    path: 'Pricing',
    component: PricingComponent,
    // canActivate: [AuthGuard],
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
    WelcomeComponent,
    ToDateTimePipe,
    ProfileComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    LoaderComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    DataService,
    AuthGuard,
    AuthService,
    LoaderService,
    SuspendedUserModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
