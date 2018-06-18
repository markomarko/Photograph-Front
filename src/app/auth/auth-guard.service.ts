import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { JwtToken } from '../model/JwtToken';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RoleConstants } from '../shared/role-constants';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const roles = route.data['roles'] as Array<string>;

    const token = this.getDecodedToken(localStorage.access_token);

    if (!token && roles.includes(RoleConstants.anonymousRole)) {
      return true;
    } else if (!token) {
      this.router.navigate(['/Login']);
      return false;
    }
    const hasPermission = roles.includes(token.role);

    if (!hasPermission) {
      this.router.navigate(['/Welcome']);
    }

    return hasPermission;
  }

  private getDecodedToken(token: string): JwtToken {
    if (!token) {
      return null;
    }

    const jwtHelperService = new JwtHelperService();

    return <JwtToken>jwtHelperService.decodeToken(token);
  }
}
