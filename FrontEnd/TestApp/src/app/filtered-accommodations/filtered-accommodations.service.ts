import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class FilteredAccommodationsService {

    constructor(private http: Http)
    {
       
    }

    getAccommodations(name: string, placeName: string): Observable<any> {
        let host = ConfigurationManager.Host;
        let filterPredicates = "";

        if (name!=undefined && name!="undefined"){
            if (filterPredicates!=""){
                filterPredicates = filterPredicates + " and ";
            }
            filterPredicates = filterPredicates + "Name eq '" + name + "'";
        }

        let urlAddress = `http://${host}/api/Accommodations?$filter=${filterPredicates} &$expand=Place, Owner, AccommodationType`
        return this.http.get(urlAddress);
    }
}