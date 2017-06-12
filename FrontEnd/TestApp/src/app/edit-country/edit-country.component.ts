import { Component, OnInit } from '@angular/core';
import { Country } from '../country/country.model';
import { EditCountryService } from './edit-country.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css'],
  providers: [EditCountryService]
})
export class EditCountryComponent implements OnInit {

  Id: number;
  Name: string;
  Code: string;

  constructor(private editCountryService: EditCountryService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"];
    this.Name = params["Name"]; this.Code = params["Code"]});
   }

  ngOnInit() {
     
  }

  onSubmit() {
    this.editCountryService.edit(new Country(this.Id, this.Name, this.Code)).subscribe(x => 
      {this.router.navigate(['/country', this.Id])}, 
      x => alert(x.json().Message));
  }

}
