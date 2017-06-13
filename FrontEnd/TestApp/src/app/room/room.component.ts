import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Room } from '../room/room.model';
import {RoomService} from './room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "app/services/auth.service";


@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [RoomService, AuthService]
})
export class RoomComponent implements OnInit, OnChanges {
 
  @Input() Id: number;
  @Input() OwnerId: number;
  Room: Room;
  Rooms: Room[];
  @Output() onDeletedRoom: EventEmitter<Room>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private roomService: RoomService, private authService: AuthService) {
    //activatedRoute.params.subscribe(params => {this.Id = params["Id"]; this.AccommodationName = params["AccName"];});
    this.Room = new Room();
    this.onDeletedRoom = new EventEmitter();
   }

  ngOnInit() {
    if(this.Id != undefined)
     {
        this.roomService.getById(this.Id).subscribe(x => { this.Rooms = x.json(); this.Room = this.Rooms[0]; }); 
     }
  }

   ngOnChanges(changes: SimpleChanges): void {
     if(this.Id != undefined)
     {
        this.roomService.getById(this.Id).subscribe(x => { this.Rooms = x.json(); this.Room = this.Rooms[0]; }); 
     }
  }

  editRoom() {
    this.router.navigate(['/editRoom', this.Id]);
  }

  deleteRoom() {
    this.roomService.delete(this.Id).subscribe(x => { this.onDeletedRoom.emit(); }, 
                                               x => alert(x.json().Message));
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
