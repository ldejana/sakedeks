import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { AddAccTypeService } from './add-acc-type.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'add-acc-type',
  templateUrl: './add-acc-type.component.html',
  styleUrls: ['./add-acc-type.component.css'],
  providers: [AddAccTypeService]
})
export class AddAccTypeComponent implements OnInit {

  Name: string;
  Message: string = "";
  @Output() onAccommodationTypeAdded: EventEmitter<AccommodationType>;

  constructor(private addAccTypeService: AddAccTypeService, private router: Router) {
    this.onAccommodationTypeAdded = new EventEmitter();
   }

  ngOnInit() {
  }

  onSubmit() {
    this.Message = "";

    this.addAccTypeService.create(new AccommodationType(1, this.Name)).subscribe(
      x => {this.Message="Accommodation type added successfuly!"; this.onAccommodationTypeAdded.emit();}, 
      x => this.Message=x.json().Message);
    this.Name = "";
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
