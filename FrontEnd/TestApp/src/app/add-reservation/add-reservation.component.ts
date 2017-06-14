import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  RoomId: number;
  AccommodationName: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {this.RoomId = params["RoomId"]; this.AccommodationName = params["AccommodationName"];});
   }

  ngOnInit() {
  }

}
