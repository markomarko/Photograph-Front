import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, provideRoutes,Routes } from "@angular/router";




import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CustomerComponent } from './customer/customer.component';
import { DataService } from './shared/dataServices';


let ChildRoutes=[
  {path:"Dashboard", component: HomeComponent},
  {path:"Gallery", component: GalleryComponent},
  {path:"Customer", component: CustomerComponent}
  
]

let routes = [
  { path: "Login", component: LoginComponent},
  { path: "Register", component: RegisterComponent},
  { path: "Home", component: HomeComponent, children:ChildRoutes}
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GalleryComponent,
    CustomerComponent
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
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
