import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from '../model/Subscriber';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post(
      environment.webApiBaseUrl + '/User/client',
      JSON.stringify(user),
      httpOptions
    );
  }

  public registerSubscriber(subscriber: Subscriber): Observable<any> {
    return this.http.post(
      environment.webApiBaseUrl + '/User/subscriber',
      JSON.stringify(subscriber),
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
