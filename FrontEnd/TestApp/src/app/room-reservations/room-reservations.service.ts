import { Injectable } from '@angular/core';
import { RoomReservation } from './room-reservation.model';
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
        return this.http.get(`http://${host}/api/RoomReservations?$filter=AppUserId eq ${userId} &$expand=Room, Room/Accommodation`);
    }

    cancelReservation(reservation: RoomReservation): Observable<any> {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        reservation.IsCanceled = true;

        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/RoomReservations/` + reservation.Id;
        return this.http.put(urlAddress, JSON.stringify(reservation), options);
    }

    getReservations(userId: number, accommodationId: number): Observable<any> {
        let host = ConfigurationManager.Host;
        let url = `http://${host}/api/RoomReservations?$filter=AppUserId eq ${userId} and Room/AccomodationId eq ${accommodationId} and IsCanceled eq false &$expand=Room`;
        return this.http.get(url);
    }

}