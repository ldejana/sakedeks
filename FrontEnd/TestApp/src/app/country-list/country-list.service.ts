import { Injectable } from '@angular/core';
import { Country } from '../country/country.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CountryListService {

    constructor(private http: Http)
    {
       
    }

    getAll() : Observable<any> {
        return this.http.get("http://localhost:54042/api/Countries");
    }

    getById(id: number) : Observable<any> {
       return this.http.get(`http://localhost:54042/api/Countries/${id}`);
    }

    create(country: Country) : Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        let options = new RequestOptions();
        options.headers = header;
        
        return this.http.post(`http://localhost:54042/api/Countries`, JSON.stringify(country), options);
    }

    update() {

    }
}