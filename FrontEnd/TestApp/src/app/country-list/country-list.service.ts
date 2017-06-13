import { Injectable } from '@angular/core';
import { Country } from '../country/country.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class CountryListService {

    constructor(private http: Http)
    {
       
    }

    getAll() : Observable<any> {
        let host = ConfigurationManager.Host;
        return this.http.get(`http://${host}/api/Countries`);
    }

    create(country: Country) : Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        return this.http.post(`http://${host}/api/Countries`, JSON.stringify(country), options);
    }
}