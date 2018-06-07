import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from "../shared/dataServices"

@Component({
    selector:'login-component',
    templateUrl:'login.component.html',
    styleUrls:["login.component.css"],
   

})

export class LoginComponent{

    constructor (private router:Router, private data:DataService){}

    public creds = {
        username:"",
        password:""
    }

    private token:any;

    onLogin(){
        this.data.login(this.creds)
        .subscribe(
            token=>this.token=token,
            success =>{
            if(success){
                localStorage.setItem('token',JSON.stringify(this.token.info)),
                localStorage.setItem('tokenExpiration',JSON.stringify(this.token.expiration)),
                this.router.navigate(["/Home"])
            }
        })
        
    }

}