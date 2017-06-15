import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';
import { RoomReservation } from '../room-reservations/room-reservation.model';

@Injectable()
export class AddReservationService {

    constructor(private http: Http)
    {
       
    }

    create(roomReservation: RoomReservation): Observable<any> {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        return this.http.post(`http://${host}/api/RoomReservations`, JSON.stringify(roomReservation), options);
    }

    getRoomById(roomId: number): Observable<any> {
        let host = ConfigurationManager.Host;
        return this.http.get(`http://${host}/api/Rooms/${roomId}`);
    }
}