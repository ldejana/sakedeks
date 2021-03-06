import { Component, OnInit } from '@angular/core';
import { Country } from '../country/country.model'
import { CountryListService } from './country-list.service';
import { RegionListComponent } from '../region-list/region-list.component';
import { AuthService } from '../services/auth.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  providers: [CountryListService]
})
export class CountryListComponent implements OnInit {

  countries: Country[];
  Name: string;
  Code: string;
  CountryId: number;

  constructor(private countryService: CountryListService, private router: Router, private authService: AuthService) { 
    this.countries = []
  }

  ngOnInit() {
    this.countryService.getAll().subscribe(x => this.countries = x.json());
  }

  onClick(CountryId : number) {
    this.CountryId = CountryId;
  }

  onSubmit(c: Country) {
    
    this.countryService.create(new Country(3, this.Name, this.Code)).subscribe();
    this.countryService.getAll().subscribe(x => this.countries = x.json());
    this.Name = "";
    this.Code = "";
  }

  isAdmin(): boolean {
    return this.authService.getRole()=="Admin";
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  addCountry() {
    this.countryService.getAll().subscribe(x => this.countries = x.json());
  }
}
