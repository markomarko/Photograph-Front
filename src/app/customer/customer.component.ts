import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Route } from '@angular/router/src/config';



@Component({
    selector:'customer-component',
    templateUrl:"customer.component.html",
    styles:[]
})

export class CustomerComponent{

    constructor(private route:Router){}

}
