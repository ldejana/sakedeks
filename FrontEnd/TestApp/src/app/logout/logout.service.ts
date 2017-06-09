import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LogoutService {

    constructor(private http: Http) {}

    logout() : Observable<any> {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;

        var body = ``;

        return this.http.post(`http://localhost:54042/api/Account/Logout`, body, options);
    }

}