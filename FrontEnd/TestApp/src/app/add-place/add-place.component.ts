import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Place } from '../place/place.model';
import { AddPlaceService } from './add-place.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
  providers: [AddPlaceService]
})
export class AddPlaceComponent implements OnInit {

  Name: string;
  Message: string = "";
  @Output() onPlaceAdded: EventEmitter<Place>;
  @Input() regionId: number;

  constructor(private addPlaceService: AddPlaceService, private router: Router) {
    this.onPlaceAdded = new EventEmitter();
   }

  ngOnInit() {
  }

  onSubmit() {
    this.Message = "";
    let newPlace = new Place(1, this.Name, this.regionId);
    this.addPlaceService.create(newPlace).subscribe(x => 
    {this.Message="Place added successfuly!"; this.onPlaceAdded.emit();}, 
      x => this.Message=x.json().Message);
    this.Name = "";
  }

}
