import { EventEmitter, Component, Output, OnInit } from '@angular/core';
import { JwtToken } from '../../model/JwtToken';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogedIn = false;
  public username: string;
  public id: string;
  private toggle = false;
  private breadCrumbs: string[] = [];
  @Output() toggleEvent = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const token = this.getDecodedToken(localStorage.access_token);
    if (token) {
      this.isLogedIn = !this.router.url.startsWith('Home');
      this.username = token.username;
      this.id = token.id;
      this.route.url.subscribe(() => {
        this.breadCrumbs = this.router.url
          .split('/')
          .filter(path => path !== '');
      });
    } else {
      this.isLogedIn = false;
      this.username = '';
    }
  }

  onToggle() {
    this.toggle = !this.toggle;
    this.toggleEvent.emit(this.toggle);
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    this.router.navigate(['/Welcome']);
  }

  private getDecodedToken(token: string): JwtToken {
    if (!token) {
      return null;
    }

    const jwtHelperService = new JwtHelperService();

    return <JwtToken>jwtHelperService.decodeToken(token);
  }
}
