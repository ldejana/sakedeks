import { Injectable } from '@angular/core';
import { Room } from '../room/room.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class RoomListService {

    constructor(private http: Http) {

    }

    getAll(accommodationId: number) {
        let host = ConfigurationManager.Host;
         return this.http.get(`http://${host}/api/Rooms?$filter=AccomodationId eq ` + accommodationId);
    }

}