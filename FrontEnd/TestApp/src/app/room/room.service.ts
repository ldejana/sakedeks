import { Injectable } from '@angular/core';
import { Room } from '../room/room.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoomService {

    constructor(private http: Http)
    {
       
    }

    getAll() : Observable<any> {
        return this.http.get("http://localhost:54042/api/Rooms");
    }

    getByAccId(id: number): Observable<any> {
        let urlAddress = "http://localhost:54042/api/Rooms?$filter=AccomodationId eq " + id;
        return this.http.get(urlAddress);
    }

}