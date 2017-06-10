import { Injectable } from '@angular/core';
import { Region } from '../region/region.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegionListService {

    constructor(private http: Http) {

    }

    getAll(countryId: number) {
         return this.http.get("http://localhost:54042/api/Regions?$filter=Id eq " + countryId);
    }

}