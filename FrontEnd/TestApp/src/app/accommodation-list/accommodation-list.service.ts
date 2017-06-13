import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class AccommodationListService {

    constructor(private http: Http)
    {
       
    }

    getAll() : Observable<any> {
        let host = ConfigurationManager.Host;
        return this.http.get(`http://${host}/api/Accommodations`);
    }

    getByAccTypeId(id: number): Observable<any> {
        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Accommodations?$filter=AccommodationTypeId eq ` + id;
        return this.http.get(urlAddress);
    }

    getByCountryId(id: number): Observable<any> {
        let host = ConfigurationManager.Host
        let urlAddress =  `http://${host}/api/Accommodations/CountryId/${id}?filter=Id eq ${id} &$expand=Place, Owner, AccommodationType`;
        return this.http.get(urlAddress);
    }

    getByRegionId(id: number): Observable<any> {
        let host = ConfigurationManager.Host;
        let urlAddress =  `http://${host}/api/Accommodations/RegionId/${id}?filter=Id eq ${id} &$expand=Place, Owner, AccommodationType`; 
        return this.http.get(urlAddress);
    }

    getByPlaceId(id: number): Observable<any> {
        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Accommodations/PlaceId/${id}?filter=Id eq ${id} &$expand=Place, Owner, AccommodationType`;
        return this.http.get(urlAddress);
    }

}

