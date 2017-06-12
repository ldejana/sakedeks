import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Country } from '../country/country.model';
import { AddCountryService } from './add-country.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css'],
  providers: [AddCountryService]
})
export class AddCountryComponent implements OnInit {

  Name: string;
  Code: string;
  Message: string = "";
  @Output() onCountryAdded: EventEmitter<Country>;

  constructor(private addCountryService: AddCountryService, private router: Router) { 
    this.onCountryAdded = new EventEmitter();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.Message = "";
    let newCountry = new Country(1, this.Name, this.Code);
    this.addCountryService.create(newCountry).subscribe(x => 
    {this.Message="Country added successfuly!"; this.onCountryAdded.emit();}, 
      x => this.Message=x.json().Message);
    this.Name = "";
    this.Code = "";
  }
}
