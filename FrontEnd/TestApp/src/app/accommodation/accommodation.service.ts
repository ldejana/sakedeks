import { Injectable } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccommodationService {

    constructor(private http: Http) {}


    getById(id: number) : Observable<any> {
        let urlAddress = `http://localhost:54042/api/Accommodations?$filter=Id eq ${id} &$expand=Place, Owner`
       return this.http.get(urlAddress);
    }
}