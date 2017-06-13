import { Injectable } from "@angular/core";
import { Room } from '../room/room.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class AddRoomService {

    constructor(private http: Http) {}

    create(room: Room) : Observable<any> {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        return this.http.post(`http://${host}/api/Rooms`, JSON.stringify(room), options);
    }
}
    
