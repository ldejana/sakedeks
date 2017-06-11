import { Injectable } from '@angular/core';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditAccTypeService {

    constructor(private http: Http)
    {
       
    }

    edit(accType: AccommodationType){
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let urlAddress = `http://localhost:54042/api/AccommodationTypes/` + accType.Id;
        return this.http.put(urlAddress, JSON.stringify(accType), options);
    }

    update() {
        
    }
}