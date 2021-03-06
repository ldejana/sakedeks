import { Injectable } from '@angular/core';
import { Place } from '../place/place.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

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
        
        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Places/` + place.Id;
        return this.http.put(urlAddress, JSON.stringify(place), options);
    }

    getById(id: number) : Observable<any> {
       let host = ConfigurationManager.Host;
       return this.http.get(`http://${host}/api/Places/${id}`);
    }
}