import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class AddReservationService {

    constructor(private http: Http)
    {
       
    }
}