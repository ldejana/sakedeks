import { Component, OnInit } from '@angular/core';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { AccommodationTypeListService } from './accommodation-type-list.service';
import {Accommodation} from '../accommodation/accommodation.model';

@Component({
  selector: 'accommodation-type-list',
  templateUrl: './accommodation-type-list.component.html',
  styleUrls: ['./accommodation-type-list.component.css'],
  providers: [AccommodationTypeListService]
})
export class AccommodationTypeListComponent implements OnInit {

  accommodationTypes: AccommodationType[];
  accommodation: AccommodationType;

  constructor(private accommodationTypeSerice: AccommodationTypeListService) { 
    this.accommodationTypes = [];
  }

  ngOnInit() {
    this.accommodationTypeSerice.getAll().subscribe( x => this.accommodationTypes=x.json());
  }

}
