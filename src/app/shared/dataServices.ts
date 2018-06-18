import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Picture } from "../model/Picture";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'

    })
};

@Injectable()
export class DataService {



    constructor(private http: HttpClient) {
    }

    public postPicture(image: Picture) {

        return this.http.post("http://localhost:54040/api/Photo/post", JSON.stringify(image), httpOptions);
    }

    public testGet(): Observable<any> {

        return this.http.get("http://localhost:54040/api/User", httpOptions);
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


}

