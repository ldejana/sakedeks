import { Injectable } from '@angular/core';
import { Region } from '../region/region.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlaceListService {
    
    constructor(private http: Http) {

    }

    getAll(regionId: number) {
         return this.http.get("http://localhost:54042/api/Places?$filter=RegionId eq " + regionId);
    }

    delete(id) {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let urlAddress = `http://localhost:54042/api/Places/` + id;
        return this.http.delete(urlAddress, options);
    }
}