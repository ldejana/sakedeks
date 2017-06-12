import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Room } from '../room/room.model';
import { Accommodation } from '../accommodation/accommodation.model';
import { RoomListService } from './room-list.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
  providers: [ RoomListService ]
})

export class RoomListComponent implements OnInit, OnChanges {

  @Input() accommodation : Accommodation;
  rooms: Room[];

  constructor(private roomListService: RoomListService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.accommodation.Id != undefined) {
      this.roomListService.getAll(this.accommodation.Id).subscribe(x => { this.rooms = x.json() });
    }
  }

}
