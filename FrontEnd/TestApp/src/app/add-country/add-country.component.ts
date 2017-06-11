import { Component, OnInit } from '@angular/core';
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

  constructor(private addCountryService: AddCountryService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.Message = "";
    this.addCountryService.create(new Country(1, this.Name, this.Code)).subscribe(x => this.Message="Country added successfuly!", 
      x => this.Message=x.json().Message);
    this.Name = "";
    this.Code = "";
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
