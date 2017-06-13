import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditRoomService } from './edit-room.service';
import { Room } from '../room/room.model';
import { Accommodation } from "app/accommodation/accommodation.model";

@Component({
  selector: 'edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
  providers: [ EditRoomService ]
})
export class EditRoomComponent implements OnInit {

  @Input() Id: number;
  PricePerNight: number;
  RoomNumber: number;
  Description: string;
  BedCount: number;
  AccommodationId: number;
  AccommodationName: string;

  Room: Room;
  Rooms: Room[];

  constructor(private editRoomService: EditRoomService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]});
      this.Room = new Room();
      this.Room.Accommodation = new Accommodation();
   }

  ngOnInit() {
    this.editRoomService.getById(this.Id).subscribe(x => { this.Rooms = x.json(); this.Room = this.Rooms[0];
      console.log(this.Room) });
  }

  onSubmit() {

    let edittedRoom = this.Room;
    this.editRoomService.edit(edittedRoom).subscribe(x => 
      {this.router.navigate(['/roomList', edittedRoom.AccomodationId, edittedRoom.Accommodation.Name, edittedRoom.Accommodation.OwnerId])}, 
      x => alert(x.json().Message));
  }

}
