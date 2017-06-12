import { Injectable } from '@angular/core';
import { Place } from '../place/place.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditPlaceService {

    constructor(private http: Http)
    {
       
    }

    edit(place: Place){
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let urlAddress = `http://localhost:54042/api/Places/` + place.Id;
        return this.http.put(urlAddress, JSON.stringify(place), options);
    }

    getById(id: number) : Observable<any> {
       return this.http.get(`http://localhost:54042/api/Places/${id}`);
    }
}