import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AddReservationService } from './add-reservation.service';
import { RoomReservation } from '../room-reservation/room-reservation.model';
import { AuthService } from '../services/auth.service';
import { Room } from "app/room/room.model";
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
  providers: [ AddReservationService, AuthService, ErrorHandlerService ]
})
export class AddReservationComponent implements OnInit {

  RoomId: number;
  AccommodationName: string;
  StartDate: Date;
  EndDate: Date;
  Message: string;
  Room: Room;
  CurrentDate: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private authService: AuthService, private addReservationService: AddReservationService,
              private errorHandlerService: ErrorHandlerService) {
    activatedRoute.params.subscribe(params => {this.RoomId = params["RoomId"]; this.AccommodationName = params["AccommodationName"];});
   
    this.StartDate = new Date();
    this.EndDate = new Date();
    this.Room = new Room();
    this.CurrentDate = new Date().toJSON().split('T')[0]
}

  ngOnInit() {
    this.addReservationService.getRoomById(this.RoomId).subscribe(x => { this.Room = x.json(); });
  }

  selectedDate() {
    if(this.EndDate <= this.StartDate) {
      this.EndDate = new Date();
      alert("Incorrect date input!");
    }
  }

  onSubmit() {
    if(this.StartDate <= this.EndDate) {

      let userId = this.authService.getUserId();
      
      let newReservation = new RoomReservation();
      newReservation.StartDate = this.StartDate;
      newReservation.EndData = this.EndDate;
      newReservation.IsCanceled = false;
      newReservation.RoomId = this.RoomId;
      newReservation.AppUserId = userId;

      this.addReservationService.create(newReservation).subscribe( 
        x => { this.router.navigate(['/roomReservations', userId]); },
        x => { this.Message = this.errorHandlerService.parseError(x); } );

    } else {
      alert("Incorrect date input!")
    }
  }

}
