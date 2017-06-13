import { Injectable } from '@angular/core';
import {RegisterData} from './register-data.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

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
        
        let host = ConfigurationManager.Host;
        return this.http.post(`http://${host}/api/Account/Register`, JSON.stringify(registerData), options);
    }

    update() {

    }
}