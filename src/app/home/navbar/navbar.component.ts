import {
  EventEmitter,
  Component,
  Output,
  DoCheck,
  OnInit
} from '@angular/core';
import { JwtToken } from '../../model/JwtToken';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogedIn = false;
  public username: string;
  private toggle = false;

  @Output() toggleEvent = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {
    const token = this.getDecodedToken(localStorage.access_token);
    if (token) {
      this.isLogedIn = !this.router.url.startsWith('Home');
      this.username = token.username;
    } else {
      this.isLogedIn = false;
      this.username = '';
    }
  }

  onToggle() {
    this.toggle = !this.toggle;
    this.toggleEvent.emit(this.toggle);
  }

  private getDecodedToken(token: string): JwtToken {
    if (!token) {
      return null;
    }

    const jwtHelperService = new JwtHelperService();

    return <JwtToken>jwtHelperService.decodeToken(token);
  }
}
