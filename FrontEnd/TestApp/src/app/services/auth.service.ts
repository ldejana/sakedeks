import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthService {

    constructor(private http: Http) {

    }

    logIn(response: Response) : void {

        let response_json = response.json();
        let access_token = response_json['access_token'];

        let role = response.headers.get('Role');
        let userId = response.headers.get('UserId');
        let userName = response.headers.get('UserName');
        console.log(role);
        console.log(userName);
        let authdata = new AuthData(role, userId, access_token, userName);

        console.log(response);
        console.log('role: ' + role);

        localStorage.setItem("token", JSON.stringify(authdata));
    }

    logOut(): void {
        if(this.isLoggedIn() === true) {
            localStorage.removeItem("token");
        }
    }

    isLoggedIn(): boolean {
        if(localStorage.getItem("token") !== null)
            return true;
        else
            return false;
    }

    getRole(): string {

        if(this.isLoggedIn()) {
            let token=localStorage.getItem("token");
             return JSON.parse(token).role;
        } 
        else {
            return undefined;
        }
    }

    getOwnerId(): number {
       let token=localStorage.getItem("token");
        return JSON.parse(token).userId;
    }

    getUserId(): number {
        let token=localStorage.getItem("token");
        return JSON.parse(token).userId;
    }

    getUserById() : Observable<any> {
       let id = this.getUserId();
       let host = ConfigurationManager.Host; 
       return this.http.get(`http://${host}/api/Users/${id}`);
    }

    getUserName() : string {
        let token=localStorage.getItem("token");
        let username = JSON.parse(token).username;
        return username;
    }
}