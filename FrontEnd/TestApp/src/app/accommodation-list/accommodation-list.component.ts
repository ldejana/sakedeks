import { Component, OnInit } from '@angular/core';
import {Accommodation} from '../accommodation/accommodation.model';
import {AccommodationListService} from './accommodation-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Origins } from '../enumerations/origins.model';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  providers: [AccommodationListService]
})
export class AccommodationListComponent implements OnInit {

  Id: number;
  path: string;
  origin: Origins;
  Accommodations: Accommodation[];
  placeName: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private accListService: AccommodationListService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]; 
                                               this.path = params["Name"]; 
                                               this.origin = params["Origin"];
                                               this.placeName = params["PlaceName"]});
   }

  ngOnInit() {
    this.Accommodations = [];

      switch(this.origin) {
        case 'AccommodationType': 
            this.accListService.getByAccTypeId(this.Id).subscribe(x => this.Accommodations = x.json()); break;
        case 'Country': 
            this.accListService.getByCountryId(this.Id).subscribe(x => this.Accommodations = x.json()); break;
        case 'Region':
            this.accListService.getByRegionId(this.Id).subscribe(x => this.Accommodations = x.json()); break;
        case 'Place': {
            this.accListService.getByPlaceId(this.Id).subscribe(x => this.Accommodations = x.json());
            this.path = this.path + " >> " + this.placeName;
            break;
        }
        default: break;
      }
  }

}
