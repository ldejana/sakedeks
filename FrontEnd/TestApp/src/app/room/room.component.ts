import { Component, OnInit } from '@angular/core';
import {Room} from '../room/room.model';
import {RoomService} from './room.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [RoomService]
})
export class RoomComponent implements OnInit {

  Id: number = -1;
  Rooms: Room[];
  AccommodationName: string;
  AccTypeName: string;
  AccTypeId: number;
  Origin: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private roomService: RoomService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]; this.AccommodationName = params["AccName"];
    this.AccTypeName = params["AccType"]; this.AccTypeId = params["AccTypeId"]; this.Origin = params["Origin"]});
   }

  ngOnInit() {
    this.roomService.getByAccId(this.Id).subscribe(x => this.Rooms = x.json());
  }

}
