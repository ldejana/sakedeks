import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Place } from '../place/place.model';
import { PlaceListService } from './place-list.service';
import { Region } from '../region/region.model';
import { Router, ActivatedRoute } from "@angular/router";
import { Origins } from '../enumerations/origins.model';

@Component({
  selector: 'place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers: [ PlaceListService ]
})
export class PlaceListComponent implements OnInit, OnChanges {
 
  @Input() region : Region;
  places: Place[];
  Origin: Origins = 'Place';
  @Input() countryName: string;
  path: string;

  constructor(private placeListService: PlaceListService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.region.Id != undefined) {
      this.path = this.countryName + ' >> ' + this.region.Name;
      this.placeListService.getAll(this.region.Id).subscribe(x => { this.places = x.json() });
    }
  }


}
