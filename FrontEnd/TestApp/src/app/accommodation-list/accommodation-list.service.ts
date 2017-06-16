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

    getAllOData() : Observable<any> {
        let host = ConfigurationManager.Host;
        return this.http.get(`http://${host}/odata/AccOData`);
    }

    getByAccTypeId(id: number, pageNumber: number, pageSize: number): Observable<any> {
        let host = ConfigurationManager.Host;
        let skip = (pageNumber - 1) * pageSize;
        let urlAddress = `http://${host}/odata/AccOData?$top=${pageSize}&$skip=${skip} &$filter=AccommodationTypeId eq ${id} 
        &$expand=Place, Owner, AccommodationType &$inlinecount=allpages`;
        return this.http.get(urlAddress);
    }

    getByPlaceId(id: number, pageNumber: number, pageSize: number): Observable<any> {
        let host = ConfigurationManager.Host;
        let skip = (pageNumber - 1) * pageSize;
        let urlAddress = `http://${host}/odata/AccOData?$top=${pageSize}&$skip=${skip} &$filter=Place/Id eq ${id} 
        &$expand=Place, Owner, AccommodationType &$inlinecount=allpages`;
        return this.http.get(urlAddress);
    }

    getDisapprovedAccs(pageNumber: number, pageSize: number): Observable<any> {
        let host = ConfigurationManager.Host;
        let skip = (pageNumber - 1) * pageSize;
        let urlAddress = `http://${host}/odata/AccOData?$top=${pageSize}&$skip=${skip} &$filter=Approved eq false 
        &$expand=Place, Owner, AccommodationType &$inlinecount=allpages`;
        return this.http.get(urlAddress);
    }

}

