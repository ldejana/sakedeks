import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { RoomReservation } from '../room-reservation/room-reservation.model';
import { RoomReservationsService } from './room-reservations.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-room-reservations',
  templateUrl: './room-reservations.component.html',
  styleUrls: ['./room-reservations.component.css'],
  providers: [ RoomReservationsService, AuthService ]
})
export class RoomReservationsComponent implements OnInit {

  RoomReservations: RoomReservation[];
  Count: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private roomReservationsService: RoomReservationsService, private authService: AuthService) { }

  ngOnInit() {
    this.roomReservationsService.getAllUserReservations().subscribe(x => { this.RoomReservations = x.json(); this.Count = this.RoomReservations.length;});
  }

  CancelReservation(reservation: RoomReservation) {
    this.roomReservationsService.cancelReservation(reservation).subscribe(
      x => { this.showReservations(); }
    
  );}

  showReservations() {
    let userId = this.authService.getUserId();
    this.router.navigate(['/roomReservations', userId]);
  }

}
