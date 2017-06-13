import { Injectable } from '@angular/core';
import { Region } from '../region/region.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

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
        
        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Regions/` + region.Id;
        return this.http.put(urlAddress, JSON.stringify(region), options);
    }

    getById(id: number) : Observable<any> {
       let host = ConfigurationManager.Host;
       return this.http.get(`http://${host}/api/Regions/${id}`);
    }
}