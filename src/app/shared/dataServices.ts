import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

@Injectable()
export class DataService {

    

    constructor(private http:HttpClient) {
    }

    
    

    public login(creds):Observable<any>{
        return this.http.post("http://localhost:2558/api/User/login", creds, httpOptions)
    }

}

