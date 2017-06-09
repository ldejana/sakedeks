import { Injectable } from '@angular/core';
import { LoginData } from './login-data.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(private http: Http) {}

    login(loginData: LoginData) : Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        let options = new RequestOptions();
        options.headers = header;
        
        return this.http.post(`http://localhost:54042/oauth/token`, JSON.stringify(loginData), options);
    }

}