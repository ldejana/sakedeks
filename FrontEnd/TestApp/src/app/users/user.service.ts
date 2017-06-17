import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class UserService {

    constructor(private http: Http)
    {
       
    }

    getAll() : Observable<any> {
        let host = ConfigurationManager.Host;
        return this.http.get(`http://${host}/api/Users`);
    }

    ban(id: number) {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        return this.http.put(`http://${host}/api/UserBan/${id}`, "", options);
    }

    unban(id: number) {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        return this.http.put(`http://${host}/api/UserUnban/${id}`, "", options);
    }
}