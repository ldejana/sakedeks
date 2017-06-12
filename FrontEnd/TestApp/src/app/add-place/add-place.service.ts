import { Injectable } from '@angular/core';
import { Place } from '../place/place.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddPlaceService {

    constructor(private http: Http)
    {
       
    }

    create(place: Place) : Observable<any> {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        return this.http.post(`http://localhost:54042/api/Places`, JSON.stringify(place), options);
    }
}