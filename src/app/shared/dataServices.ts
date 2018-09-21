import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Picture } from '../model/Picture';
import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { JwtToken } from '../model/JwtToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Album } from '../model/Album';
import { PagingHeader } from '../model/PagingHeader';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    // Picture Methods
    public postPicture(image: Picture[]) {
        return this.http.post(environment.webApiBaseUrl + '/Photo/', JSON.stringify(image), httpOptions);
    }

    public getPictures(id: string, pagingHeader: PagingHeader): Observable<HttpResponse<Picture[]>> {
        return this.http.get<Picture[]>(environment.webApiBaseUrl + '/Photo/?id=' + id +
            '&pageNumber=' + pagingHeader.pageNumber + '&pageSize=' + pagingHeader.pageSize,
             {headers: httpOptions.headers, observe: 'response'});
    }

    public deletePicture(id: string) {
        return this.http.delete(environment.webApiBaseUrl + '/Photo/' + id, httpOptions);
    }

    public putPicture(picture: Picture){
        return this.http.put(environment.webApiBaseUrl + '/Photo/', JSON.stringify(picture), httpOptions);
    }

    // Album Methods
    public getAlbum(): Observable<Album[]> {
        let id = this.getUserId();
        return this.http.get<Album[]>(environment.webApiBaseUrl + '/Album/' + id, httpOptions);
    }

    public postAlbum(album: Album) {
        return this.http.post(environment.webApiBaseUrl + '/Album/', JSON.stringify(album), httpOptions);
    }

    public deleteAlbum(id: number) {
        return this.http.delete(environment.webApiBaseUrl + '/Album/' + id, httpOptions);
    }

    // User Methods
    public getUsers(): Observable<any> {
        return this.http.get<User[]>(environment.webApiBaseUrl + '/User/GetAll', {
            responseType: 'json'
        });
    }

    public getRangeUsers(pagingHeader: PagingHeader): Observable<HttpResponse<User[]>> {
        return this.http.get<User[]>(environment.webApiBaseUrl + '/User?pageNumber=' +
        pagingHeader.pageNumber + '&pageSize=' + pagingHeader.pageSize, {
            headers: httpOptions.headers,
            observe: 'response',
            responseType: 'json'
        });
    }

    public getUser(id: string): Observable<any> {
        return this.http.get<User>(environment.webApiBaseUrl + '/User/' + id, {
            responseType: 'json'
        });
    }

    public deleteUser(id: string) {
        return this.http.delete(environment.webApiBaseUrl + '/User/?id=' + id, httpOptions);
    }

    public suspendUser(id: string) {
        return this.http.get(environment.webApiBaseUrl + '/User/' + id + '/suspend', httpOptions);
    }

    public resumeUser(id: string) {
        return this.http.get(environment.webApiBaseUrl + '/User/' + id + '/resume', httpOptions);
    }


    public getUserId(): string {
        let jwt = localStorage.access_token;
        let jwtData = jwt.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        let id = decodedJwtData.id;
        return id;
    }

    public getDecodedToken(token: string): JwtToken {
        if (!token) {
            return null;
        }
        const jwtHelperService = new JwtHelperService();
        return <JwtToken>jwtHelperService.decodeToken(token);
    }

    public getPermission(): boolean {
        let temp_token = this.getDecodedToken(localStorage.access_token);
        let role = temp_token.role;
        if ((role === 'Admin') || (role === 'Subscriber')) { return true; } else  { return false; }
    }
}
