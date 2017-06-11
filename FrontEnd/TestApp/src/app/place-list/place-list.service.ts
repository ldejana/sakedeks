import { Injectable } from '@angular/core';
import { Region } from '../region/region.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlaceListService {
    
    constructor(private http: Http) {

    }

    getAll(regionId: number) {
         return this.http.get("http://localhost:54042/api/Places?$filter=RegionId eq " + regionId);
    }
}