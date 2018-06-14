import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  public toggle = false;

  constructor(private router: Router) {}

  onToggle() {
    console.log('toggle');
    this.toggle = !this.toggle;
  }
}
