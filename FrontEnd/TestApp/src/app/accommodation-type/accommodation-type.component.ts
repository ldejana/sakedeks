import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {Accommodation} from '../accommodation/accommodation.model';
import {AccommodationTypeService} from './accommodation-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Origins } from '../enumerations/origins.model';

@Component({
  selector: 'accommodation-type',
  templateUrl: './accommodation-type.component.html',
  styleUrls: ['./accommodation-type.component.css'],
  providers: [AccommodationTypeService]
})
export class AccommodationTypeComponent implements OnInit, OnChanges {
  
  Id: number = -1;
  Accomodations: Accommodation[];
  AccommodationType: string;
  Origin: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private accTypeService: AccommodationTypeService) { 
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]; 
                                               this.AccommodationType = params["Name"]; 
                                               this.Origin = params["Origin"]});
  }

  ngOnInit() {
     this.getData();
   }

   ngOnChanges(changes: SimpleChanges): void {
     this.getData();
  }

  getData() {
    this.Accomodations = [];

      switch(this.Origin) {
        case 'AccommodationType': 
            this.accTypeService.getByAccTypeId(this.Id).subscribe(x => this.Accomodations = x.json()); break;
        case 'Country': 
            this.accTypeService.getByCountryId(this.Id).subscribe(x => this.Accomodations = x.json()); break;
        case 'Region':
            this.accTypeService.getByRegionId(this.Id).subscribe(x => this.Accomodations = x.json()); break;
        case 'Place':
            this.accTypeService.getByPlaceId(this.Id).subscribe(x => this.Accomodations = x.json()); break;
        default: break;
      }
  }
  

}
