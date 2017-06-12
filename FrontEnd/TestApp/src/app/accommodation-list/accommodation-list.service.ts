import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccommodationListService {

    constructor(private http: Http)
    {
       
    }

    getAll() : Observable<any> {
        return this.http.get("http://localhost:54042/api/Accommodations");
    }

    getByAccTypeId(id: number): Observable<any> {
        let urlAddress = "http://localhost:54042/api/Accommodations?$filter=AccommodationTypeId eq " + id;
        return this.http.get(urlAddress);
    }

    getByCountryId(id: number): Observable<any> {
        let urlAddress =  `http://localhost:54042/api/Accommodations/CountryId/${id}?filter=Id eq ${id} &$expand=Place, Owner`;
        return this.http.get(urlAddress);
    }

    getByRegionId(id: number): Observable<any> {
        let urlAddress =  `http://localhost:54042/api/Accommodations/RegionId/${id}?filter=Id eq ${id} &$expand=Place, Owner`; 
        return this.http.get(urlAddress);
    }

    getByPlaceId(id: number): Observable<any> {
        let urlAddress = `http://localhost:54042/api/Accommodations/PlaceId/${id}?filter=Id eq ${id} &$expand=Place, Owner`;
        return this.http.get(urlAddress);
    }

}

