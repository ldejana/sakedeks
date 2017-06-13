import { Injectable } from '@angular/core';
import { Room } from '../room/room.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class RoomService {

    constructor(private http: Http)
    {
       
    }

    getAll() : Observable<any> {
        let host = ConfigurationManager.Host;
        return this.http.get(`http://${host}/api/Rooms`);
    }

    getByAccId(id: number): Observable<any> {
        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}}/api/Rooms?$filter=AccomodationId eq ` + id;
        return this.http.get(urlAddress);
    }

}