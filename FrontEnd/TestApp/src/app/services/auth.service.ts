import { Response } from '@angular/http'
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor() {

    }

    logIn(response: Response) : void {

        let response_json = response.json();
        let access_token = response_json['access_token'];

        let role = response.headers.get('Role');
        let userId = response.headers.get('UserId');
        console.log(role);
        let authdata = new AuthData(role, userId, access_token);

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
        let token=localStorage.getItem("token");
        return JSON.parse(token).role;
    }

    getOwnerId(): number {
        let token=localStorage.getItem("token");
        return JSON.parse(token).userId;
    }

}