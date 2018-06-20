import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Picture } from '../model/Picture';
import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { JwtToken } from '../model/JwtToken';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  public postPicture(image: Picture) {
    return this.http.post(
      'http://localhost:54040/api/Photo/post',
      JSON.stringify(image),
      httpOptions
    );
  }

  public testGet(): Observable<any> {
    return this.http.get('http://localhost:54040/api/User', httpOptions);
  }

  public getUsers(): Observable<any> {
    return this.http.get<User[]>(environment.webApiBaseUrl + '/User', {
      responseType: 'json'
    });
  }

  public getUser(id: string): Observable<any> {
    return this.http.get<User>(environment.webApiBaseUrl + '/User/' + id, {
      responseType: 'json'
    });
  }

  public getUserId(): number {
    let jwt = localStorage.access_token;

    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    let id = decodedJwtData.id;
    console.log(id);
    return id;
  }

  public getDecodedToken(token: string): JwtToken {
    if (!token) {
      return null;
    }

    const jwtHelperService = new JwtHelperService();

    return <JwtToken>jwtHelperService.decodeToken(token);
  }
}
