import { Component } from "@angular/core";
import {Router} from '@angular/router';


@Component({
    selector:'register-component',
    templateUrl:"register.component.html",
    styleUrls:["register.component.css"]
})

export class RegisterComponent{

    constructor(private router:Router){}

    errorMessage:string=""
    public creds = {
        username:"",
        password:"",
        name:"",
        surname:""
    }

   

}