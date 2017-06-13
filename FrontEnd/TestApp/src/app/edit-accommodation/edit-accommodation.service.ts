import { Injectable } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class EditAccommodationService {

    constructor(private http: Http)
    {
       
    }

    edit(accommodation: Accommodation){
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Accommodations/` + accommodation.Id;
        return this.http.put(urlAddress, JSON.stringify(accommodation), options);
    }

    getById(id: number) : Observable<any> {
       let host = ConfigurationManager.Host;
       return this.http.get(`http://${host}/api/Accommodations/${id}`);
    }
}