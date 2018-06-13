import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Route } from '@angular/router/src/config';
import { DataService } from '../shared/dataServices';



@Component({
    selector:'customer-component',
    templateUrl:"customer.component.html",
    styles:[]
})

export class CustomerComponent{

    constructor(private route:Router, private data: DataService){}

    
    private users:any;

    get(){
       this.data.getUserId();
    }

}
