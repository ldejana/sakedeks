import { Injectable } from '@angular/core';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccommodationTypeListService {

    constructor(private http: Http)
    {
       
    }

    getAll() : Observable<any> {
        return this.http.get("http://localhost:54042/api/AccommodationTypes");
    }

}