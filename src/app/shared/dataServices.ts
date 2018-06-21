import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Picture } from "../model/Picture";
import { environment } from "../../environments/environment";
import { Album } from "../model/Album";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true',
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

    public getPictures(id: string): Observable<Picture[]>{
        return this.http.get<Picture[]>(environment.webApiBaseUrl + '/Photo/get?id=' + id, httpOptions);
    }

    public deletePicture(id: number) {
        let userId = this.getUserId();
        return this.http.delete(environment.webApiBaseUrl + '/Photo/delete?id=' + JSON.stringify(id) + '&userid=' + userId, httpOptions);
    }

    // Album Methods
    public getAlbum(): Observable<Album[]>{
        let id = this.getUserId();
        return this.http.get<Album[]>(environment.webApiBaseUrl + '/Album/get?id=' + id, httpOptions);
    }

    public postAlbum(album: Album) {
        return this.http.post(environment.webApiBaseUrl + '/Album/post', JSON.stringify(album), httpOptions);
    }

    public deleteAlbum(id: number) {
        return this.http.delete(environment.webApiBaseUrl + '/Album/delete?id=' + JSON.stringify(id) , httpOptions );
    }

    // Shared
    public getUserId(): number {
        let jwt = localStorage.access_token;

        let jwtData = jwt.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);

        let id = decodedJwtData.id;
        console.log(id);
        return id;
    }
}

