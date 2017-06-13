import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AddRoomService } from "app/add-room/add-room.service";
import { Room } from "app/room/room.model";

@Component({
  selector: 'add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
  providers: [ AddRoomService ]
})
export class AddRoomComponent implements OnInit {

    Message: string = "";

    RoomNumber: number;
    BedCount: number;
    Description: string;
    PricePerNight: number;
    @Input() AccommodationId: number = 1007;
    @Output() onRoomAdded: EventEmitter<any>;
    
    constructor(private addRoomService: AddRoomService) {
      this.onRoomAdded = new EventEmitter();
    }

    ngOnInit() {
    }

    onSubmit() {
      this.Message = "";
      let newRoom = new Room(1, this.RoomNumber, this.BedCount, this.Description, this.PricePerNight, this.AccommodationId);
      this.addRoomService.create(newRoom).subscribe(
        x => {this.Message="Room added successfuly!"; this.onRoomAdded.emit();}, 
        x => this.Message=x.json().Message);
      
    }

}
