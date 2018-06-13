import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from "../shared/dataServices"
import { HttpParams } from '@angular/common/http';

@Component({
    selector:'login-component',
    templateUrl:'login.component.html',
    styleUrls:["login.component.css"],
   

})

export class LoginComponent{

    constructor (private router:Router, private data:DataService){}

    public creds = {
        username:"",
        password:"",
        grant_type:"password",
        client_id:"PhotographId",
        scope:"Photograph",
        client_secret:"photographSecret"
    }



    private token:any;
    private expire_in:any;
    onLogin(){

        let httpParams = new HttpParams()
            .append("username",this.creds.username)
            .append("password",this.creds.password)
            .append("grant_type",this.creds.grant_type)
            .append("client_id",this.creds.client_id)
            .append("scope",this.creds.scope)
            .append("client_secret",this.creds.client_secret);

        console.log(httpParams);
        this.data.login(httpParams)
        .subscribe(
            token=>{
                this.token=token;
                localStorage.setItem('access_token', this.token.access_token);
                localStorage.setItem('expires_in',this.token.expires_in);
            }
        )
        this.router.navigate(["/Home"])
        
    }

}