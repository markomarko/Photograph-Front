import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/dataServices';

@Component({
  selector: 'home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  public toggle = false;

  constructor(private router: Router, private data: DataService) {}

  onToggle(isToggle: boolean) {
    this.toggle = isToggle;
  }
}
