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

    create(country: Country) : Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        let options = new RequestOptions();
        options.headers = header;
        
        return this.http.post(`http://localhost:54042/api/Countries`, JSON.stringify(country), options);
    }

    delete(id) {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let urlAddress = `http://localhost:54042/api/Countries/` + id;
        return this.http.delete(urlAddress, options);
    }

    update() {

    }
}