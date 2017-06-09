import { Response } from '@angular/http'

export class AuthService {

    leggedIn : boolean;
    constructor() {

    }

    logIn(userName: string, response: Response) : void {
        localStorage.setItem(userName, "")
    }

}