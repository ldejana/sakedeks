import { Response } from '@angular/http'
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {

    constructor() {

    }

    parseError(response: Response): string {
        
        let response_json = response.json();
        let error = "";

        error = response_json["error_description"];
        if (error != "" && error != undefined) {
            return error;
        }
            
        error = response_json["Message"];
        if (error != "" && error != undefined) {
            return error;
        }
    }
}