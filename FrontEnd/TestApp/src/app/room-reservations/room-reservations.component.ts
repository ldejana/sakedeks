import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { RoomReservation } from '../room-reservation/room-reservation.model';
import { RoomReservationsService } from './room-reservations.service';

@Component({
  selector: 'app-room-reservations',
  templateUrl: './room-reservations.component.html',
  styleUrls: ['./room-reservations.component.css'],
  providers: [ RoomReservationsService ]
})
export class RoomReservationsComponent implements OnInit {

  RoomReservations: RoomReservation[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private roomReservationsService: RoomReservationsService) { }

  ngOnInit() {
    this.roomReservationsService.getAllUserReservations().subscribe(x => { this.RoomReservations = x.json(); });
  }

}
