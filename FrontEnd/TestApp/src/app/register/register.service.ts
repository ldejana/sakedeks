import { Injectable } from '@angular/core';
import {RegisterData} from './register-data.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {

    constructor(private http: Http)
    {
       
    }

    register(registerData: RegisterData) : Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        let options = new RequestOptions();
        options.headers = header;
        
        return this.http.post(`http://localhost:54042/api/Account/Register`, JSON.stringify(registerData), options);
    }

    update() {

    }
}