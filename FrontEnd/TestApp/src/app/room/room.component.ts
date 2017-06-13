import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {Room} from '../room/room.model';
import {RoomService} from './room.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [RoomService]
})
export class RoomComponent implements OnInit, OnChanges {
 

  @Input() Id: number;
  Room: Room;
  Rooms: Room[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private roomService: RoomService) {
    //activatedRoute.params.subscribe(params => {this.Id = params["Id"]; this.AccommodationName = params["AccName"];});
    this.Room = new Room();
   }

  ngOnInit() {
    this.roomService.getById(this.Id).subscribe(x => { this.Rooms = x.json(); this.Room = this.Rooms[0]; });
  }

   ngOnChanges(changes: SimpleChanges): void {
     this.roomService.getById(this.Id).subscribe(x => { this.Rooms = x.json(); this.Room = this.Rooms[0]; });
  }

}
