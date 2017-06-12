import { Injectable } from '@angular/core';
import { Region } from '../region/region.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditRegionService {

    constructor(private http: Http)
    {
       
    }

    edit(region: Region){
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let urlAddress = `http://localhost:54042/api/Regions/` + region.Id;
        return this.http.put(urlAddress, JSON.stringify(region), options);
    }

    getById(id: number) : Observable<any> {
       return this.http.get(`http://localhost:54042/api/Regions/${id}`);
    }
}