import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Route } from '@angular/router/src/config';



@Component({
    selector:'gallery-component',
    templateUrl:"gallery.component.html",
    styles:[]
})

export class GalleryComponent{

    constructor(private router:Router){}

}
