import { Injectable } from '@angular/core';
import { RoomReservation } from '../room-reservation/room-reservation.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RoomReservationsService {

    constructor(private http: Http, private authService: AuthService) {

    }

    getAllUserReservations(): Observable<any> {
        let userId = this.authService.getUserId();
        let host = ConfigurationManager.Host;
        return this.http.get(`http://${host}/api/RoomReservations?$filter=AppUserId eq ` + userId);
    }

}