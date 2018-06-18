import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'true'
  })
};

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post(
      environment.webApiBaseUrl + '/User',
      JSON.stringify(user),
      httpOptions
    );
  }

  public login(creds): Observable<any> {
    return this.http.post(
      environment.identityBaseUrl + '/connect/token',
      creds
    );
  }
}
