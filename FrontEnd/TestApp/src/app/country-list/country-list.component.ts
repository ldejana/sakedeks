import { Component, OnInit } from '@angular/core';
import { Country } from '../country/country.model'
import { CountryListService } from './country-list.service';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  providers: [CountryListService]
})
export class CountryListComponent implements OnInit {

  countries: Country[]
  Name: string;
  Code: string;

  constructor(private countryService: CountryListService) { 
    this.countries = []
  }

  ngOnInit() {
    this.countryService.getAll().subscribe(x => this.countries = x.json());
  }

  onSubmit(c: Country) {
    
    this.countryService.create(new Country(3, this.Name, this.Code));
    this.Name = "";
    this.Code = "";
  }

}
