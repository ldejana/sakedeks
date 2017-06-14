import { Injectable } from '@angular/core';
import { Room } from '../room/room.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';
import { AuthService } from "app/services/auth.service";

@Injectable()
export class RoomService {

    constructor(private http: Http)
    {
       
    }

    getAll() : Observable<any> {
        let host = ConfigurationManager.Host;
        return this.http.get(`http://${host}/api/Rooms`);
    }

    getById(id: number): Observable<any> {
        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Rooms?$filter=Id eq ${id} &$expand=Accommodation`;
        return this.http.get(urlAddress);
    }

     delete(id: number) {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Rooms/` + id;
        return this.http.delete(urlAddress, options);
    }

}