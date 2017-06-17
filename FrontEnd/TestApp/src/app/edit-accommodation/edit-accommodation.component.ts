import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { EditAccommodationService } from './edit-accommodation.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-edit-accommodation',
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css'],
  providers: [EditAccommodationService]
})
export class EditAccommodationComponent implements OnInit {

  Id: number;
  Name: string;
  Description: string;
  Address: string;
  Latitude: number;
  Longitude: number;
  AverageGrade: number;
  ImageUrl: string;
  Approved: boolean;
  AccommodationTypeId: number;
  PlaceId: number;
  OwnerId: number;
  file: File;

  constructor(private editAccommodationService: EditAccommodationService, private activatedRoute: ActivatedRoute, private router: Router) { 
      activatedRoute.params.subscribe(params => {this.Id = params["Id"]; this.Name = params["Name"];
      this.Description = params["Description"]; this.Address = params["Address"]; this.Latitude = params["Latitude"];
      this.Longitude = params["Longitude"]; this.AverageGrade = params["AverageGrade"]; this.ImageUrl = params["ImageUrl"];
      this.Approved = params["Approved"]; this.AccommodationTypeId = params["AccommodationTypeId"]; this.PlaceId = params["PlaceId"];
      this.OwnerId = params["OwnerId"];});
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.file == undefined) {
      alert ("Choose picture!");
    }
    else {
      let newAcc = new Accommodation(this.Id, this.Name, this.Description, this.Address, this.AverageGrade, this.Latitude, this.Longitude,
      this.ImageUrl, this.Approved, this.AccommodationTypeId, this.PlaceId, this.OwnerId);
      this.editAccommodationService.edit(newAcc, this.file).subscribe(x => 
        {this.router.navigate(['/accommodation', this.Id])}, 
        x => alert(x.json().Message));
    }
  }

  onImageChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
  }

}
