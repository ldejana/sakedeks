import { Injectable } from '@angular/core';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddAccTypeService {

    constructor(private http: Http)
    {
       
    }

    create(accType: AccommodationType) : Observable<any> {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        return this.http.post(`http://localhost:54042/api/AccommodationTypes`, JSON.stringify(accType), options);
    }

    update() {
        
    }
}