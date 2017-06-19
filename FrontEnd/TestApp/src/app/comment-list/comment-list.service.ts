import { Injectable } from "@angular/core";
import { Comment } from './comment.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationManager } from '../services/configuration-manager.service';
import { RoomReservationsService } from '../room-reservations/room-reservations.service';
import { AuthService } from "app/services/auth.service";

@Injectable()
export class CommentListService {

    constructor(private http: Http, private authService: AuthService) {}

    create(comment: Comment) : Observable<any> {
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        return this.http.post(`http://${host}/api/Comments`, JSON.stringify(comment), options);
    }

    getAll(accommodationId: number): Observable<any> {
        let host = ConfigurationManager.Host;
        let url = `http://${host}/api/Comments?$filter=AccommodationId eq ${accommodationId} &$expand=AppUser`;
        return this.http.get(url);
    }

     getReservations(accommodationId: number): Observable<any> {
        let userId = this.authService.getUserId();
        let host = ConfigurationManager.Host;
        let url = `http://${host}/api/RoomReservations?$filter=AppUserId eq ${userId} and Room/AccomodationId eq ${accommodationId} and IsCanceled eq false &$expand=Room`;
        return this.http.get(url);
    }

    deleteComment(userId: number, accommodationId: number): Observable<any> {
       let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ JSON.parse(token).token);

        let options = new RequestOptions();
        options.headers = header;
        
        let host = ConfigurationManager.Host;
        let urlAddress = `http://${host}/api/Comments/${userId}/${accommodationId}`;
        return this.http.delete(urlAddress, options);
    }
}
    
