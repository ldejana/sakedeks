import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RegionListService } from './region-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Region } from '../region/region.model';
import { Country } from '../country/country.model';
import { AuthService } from '../services/auth.service';
import { CountryListService } from '../country-list/country-list.service';
import { Origins } from '../enumerations/origins.model';

@Component({
  selector: 'region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css'],
  providers: [ RegionListService, CountryListService ]
  
})
export class RegionListComponent implements OnInit, OnChanges {
 

  @Input() country: Country;
  regions : Region[];


  constructor(private regionListService : RegionListService, private authService: AuthService,
    private countryListService: CountryListService, private router: Router) {
    this.regions = [];
  }

  ngOnInit() {

  }

   ngOnChanges(changes: SimpleChanges): void {
     if (this.country.Id != undefined){
        this.regionListService.getAll(this.country.Id).subscribe(x => { this.regions = x.json() });
     }
  }

  /*

  

  editCountry(id, name, code){
    this.router.navigate(['/editCountry', id, name, code]);
  }

  addRegion(countryId, countryName) {
    this.router.navigate(['/addRegion', countryId, countryName]);
  }*/
}
