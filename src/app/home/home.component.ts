import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector:'home-component',
    templateUrl:'home.component.html',
    styleUrls:["home.component.css"]

})

export class HomeComponent{

    constructor (private router:Router){}


}