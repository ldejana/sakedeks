import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RegionListService } from './region-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Region } from '../region/region.model';
import { Country } from '../country/country.model';
import { Origins } from '../enumerations/origins.model';

@Component({
  selector: 'region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css'],
  providers: [ RegionListService ]
  
})
export class RegionListComponent implements OnInit {
  
  @Input() country: Country;
  @Input() show: boolean = false;
  regions : Region[];
  Origin : Origins = 'Country';


  constructor(private regionListService : RegionListService) {
    this.regions = [];
  }

  ngOnInit() {
     
  }

  getData() {
    this.regionListService.getAll(this.country.Id).subscribe(x => { this.regions = x.json() });
  }

  onClick() {
    if(this.regions.length == 0){
      this.getData();
    } 
    this.show = !this.show;
  }

}
