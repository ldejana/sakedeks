import { Injectable } from '@angular/core';
import { Room } from '../room/room.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoomListService {

    constructor(private http: Http) {

    }

    getAll(accommodationId: number) {
         return this.http.get("http://localhost:54042/api/Rooms?$filter=AccomodationId eq " + accommodationId);
    }

}