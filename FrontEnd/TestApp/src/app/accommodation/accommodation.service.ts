import { Injectable } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';
import { AuthService } from '../services/auth.service';



@Injectable()
export class AccommodationService {

    constructor(private http: Http, private authService: AuthService) {

         
    }

    getById(id: number) : Observable<any> {

        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Accommodations?$filter=Id eq ${id} &$expand=Place, Owner, AccommodationType`
        return this.http.get(urlAddress);
    }

    delete(id) {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Accommodations/` + id;
        return this.http.delete(urlAddress, options);
    }
}