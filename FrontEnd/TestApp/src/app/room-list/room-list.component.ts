import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Room } from '../room/room.model';
import { Accommodation } from '../accommodation/accommodation.model';
import { RoomListService } from './room-list.service';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "app/services/auth.service";

@Component({
  selector: 'room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
  providers: [ RoomListService, AuthService ]
})

export class RoomListComponent implements OnInit {

  accommodationId: number;
  accommodationName: string;
  ownerId: number;
  rooms: Room[];

  constructor(private roomListService: RoomListService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    activatedRoute.params.subscribe(params => {this.accommodationId = params["AccommodationId"]; 
                                               this.accommodationName = params["AccommodationName"];
                                               this.ownerId = params["OwnerId"]});
      
   }

  ngOnInit() {
    if (this.accommodationId != undefined) {
      this.roomListService.getAll(this.accommodationId).subscribe(x => { this.rooms = x.json() });
    }
  }

  roomListChanged() {
     if (this.accommodationId != undefined) {
      this.roomListService.getAll(this.accommodationId).subscribe(x => { this.rooms = x.json() });
    }
  }

   isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    isManager() : boolean{
        return this.authService.getRole() == "Manager";
     }

    isMyAcc(ownerId: number): boolean {
        return this.authService.getOwnerId() == ownerId;
    }

}
