import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RegionListService } from './region-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Region } from '../region/region.model';
import { Country } from '../country/country.model';

@Component({
  selector: 'region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css'],
  providers: [ RegionListService ]
  
})
export class RegionListComponent implements OnInit, OnChanges {
  
  @Input() country: Country;
  @Input() show: boolean = false;
  regions : Region[];
 /*
  constructor(private regionListService: RegionListService, private router: Router, private activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(params => {this.countryId = params["countryId"]});
   }
 */

  constructor(private regionListService : RegionListService) {
    this.regions = [];
  }

  ngOnInit() {
     
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.regionListService.getAll(this.country.Id).subscribe(x => { this.regions = x.json() });
  }

  onClick() {
    this.show = !this.show;
  }
}
