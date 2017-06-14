import { Injectable } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class AddAccommodationService {

    constructor(private http: Http)
    {
       
    }

    create(accommodation: Accommodation, file: File) : Observable<any> {
        let formData: FormData = new FormData();
        formData.append('accommodation', JSON.stringify(accommodation));
        formData.append('uploadFile', file, file.name);
        
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);
        header.append('enctype', 'multipart/form-data');

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        return this.http.post(`http://${host}/api/Accommodations`, formData, options);
    }
}