import { Response } from '@angular/http'
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor() {

    }

    logIn(userName: string, response: Response) : void {

        let response_json = response.json();
        let access_token = response_json['access_token'];

        let role = response.headers.get('Role');
        console.log(role);
        let authdata = new AuthData('Admin', access_token);

        console.log(response);
        console.log('role: ' + role);


        localStorage.setItem(userName, JSON.stringify(authdata));
    }

    logOut(userName: string): void {
        if(this.isLoggedIn(userName) === true) {
            localStorage.removeItem(userName);
        }
    }

    isLoggedIn(userName: string): boolean {
        if(localStorage.getItem(userName) !== null)
            return true;
        else
            return false;
    }

}