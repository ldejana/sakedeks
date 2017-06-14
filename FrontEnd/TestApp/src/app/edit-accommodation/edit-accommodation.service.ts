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

    edit(accommodation: Accommodation, file: File){
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
        let urlAddress = `http://${host}/api/Accommodations/${accommodation.Id}`;
        return this.http.put(urlAddress, formData, options);
    }

    getById(id: number) : Observable<any> {
       let host = ConfigurationManager.Host;
       return this.http.get(`http://${host}/api/Accommodations/${id}`);
    }
}