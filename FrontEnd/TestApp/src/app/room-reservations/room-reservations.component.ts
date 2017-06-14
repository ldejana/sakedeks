import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-room-reservations',
  templateUrl: './room-reservations.component.html',
  styleUrls: ['./room-reservations.component.css']
})
export class RoomReservationsComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
  }

}
