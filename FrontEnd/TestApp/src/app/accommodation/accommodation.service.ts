import { Injectable } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class AccommodationService {

    constructor(private http: Http) {}


    getById(id: number) : Observable<any> {

        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Accommodations?$filter=Id eq ${id} &$expand=Place, Owner`
        return this.http.get(urlAddress);
    }
}