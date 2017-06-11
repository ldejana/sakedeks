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
 

  show: boolean = false;
  @Input() region : Region;
  places: Place[];
  regionId: number;
  Origin: Origins = 'Region';

  constructor(private placeListService: PlaceListService, private router: Router, private activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(params => {this.regionId = params["regionId"]});
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.placeListService.getAll(this.region.Id).subscribe(x => { this.places = x.json() });
  }

  onClick() {
    this.show = !this.show;
  }

}
