import { Injectable } from '@angular/core';
import { Region } from '../region/region.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class PlaceListService {
    
    constructor(private http: Http) {

    }

    getAll(regionId: number) {
         let host = ConfigurationManager.Host;
         return this.http.get(`http://${host}/api/Places?$filter=RegionId eq ` + regionId);
    }

    delete(id) {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Places/` + id;
        return this.http.delete(urlAddress, options);
    }
}