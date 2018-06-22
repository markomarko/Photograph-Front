import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Picture } from '../model/Picture';
import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { JwtToken } from '../model/JwtToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Album } from '../model/Album';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    // Picture Methods
    public postPicture(image: Picture[]) {
        return this.http.post(environment.webApiBaseUrl + '/Photo/post', JSON.stringify(image), httpOptions);
    }

    public getPictures(id: string): Observable<Picture[]> {
        return this.http.get<Picture[]>(environment.webApiBaseUrl + '/Photo/get?id=' + id, httpOptions);
    }

    public deletePicture(id: number) {
        let userId = this.getUserId();
        return this.http.delete(environment.webApiBaseUrl + '/Photo/delete?id=' + JSON.stringify(id) + '&userid=' + userId, httpOptions);
    }

    // Album Methods
    public getAlbum(): Observable<Album[]> {
        let id = this.getUserId();
        return this.http.get<Album[]>(environment.webApiBaseUrl + '/Album/get?id=' + id, httpOptions);
    }

    public postAlbum(album: Album) {
        return this.http.post(environment.webApiBaseUrl + '/Album/post', JSON.stringify(album), httpOptions);
    }

    public deleteAlbum(id: number) {
        return this.http.delete(environment.webApiBaseUrl + '/Album/delete?id=' + JSON.stringify(id), httpOptions);
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
