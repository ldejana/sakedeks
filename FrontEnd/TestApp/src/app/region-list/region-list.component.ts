import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RegionListService } from './region-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Region } from '../region/region.model';
import { Country } from '../country/country.model';
import { AuthService } from '../services/auth.service';
import { CountryListService } from '../country-list/country-list.service';

@Component({
  selector: 'region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css'],
  providers: [ RegionListService, CountryListService ]
  
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

  constructor(private regionListService : RegionListService, private authService: AuthService,
    private countryListService: CountryListService, private router: Router) {
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

  isAdmin(): boolean {
    return this.authService.getRole()=="Admin";
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  deleteCountry(id) {
    this.countryListService.delete(id).subscribe(x => alert("Country deleted successfuly!"), 
      x => alert(x.json().Message));
  }

  editCountry(id, name, code){
    this.router.navigate(['/editCountry', id, name, code]);
  }

  addRegion(countryId, countryName) {
    this.router.navigate(['/addRegion', countryId, countryName]);
  }

}
