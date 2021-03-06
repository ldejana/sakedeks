import { Injectable } from '@angular/core';
import { Region } from '../region/region.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class RegionListService {

    constructor(private http: Http) {

    }

    getAll(countryId: number) {

         let host = ConfigurationManager.Host;
         return this.http.get(`http://${host}/api/Regions?$filter=CountryId eq ` + countryId);
    }

}