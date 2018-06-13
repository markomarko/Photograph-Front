import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, provideRoutes, Routes } from '@angular/router';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptor';


import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CustomerComponent } from './customer/customer.component';
import {PricingComponent} from './pricing/pricing.component';
import { DataService } from './shared/dataServices';




const ChildRoutes=[
  {path:"Dashboard" , component: HomeComponent},
  {path:"Gallery", component: GalleryComponent},
  {path:"Customer", component: CustomerComponent}
  
];

const routes = [
  { path: "Login", component: LoginComponent},
  { path: "Register", component: RegisterComponent},
  { path: "Home", component: HomeComponent, children: ChildRoutes},
  { path: "Pricing", component: PricingComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GalleryComponent,
    CustomerComponent,
    PricingComponent
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
    
  ],
  providers: [
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
