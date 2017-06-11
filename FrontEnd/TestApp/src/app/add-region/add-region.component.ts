import { Component, OnInit } from '@angular/core';
import { Region } from '../region/region.model';
import { AddRegionService } from './add-region.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css'],
  providers: [AddRegionService]
})
export class AddRegionComponent implements OnInit {

  Name: string;
  CountryName: string;
  CountryId: number;
  Message: string = "";

  constructor(private addRegionService: AddRegionService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {this.CountryId = params["CountryId"]; this.CountryName = params["CountryName"];});
   }

  ngOnInit() {
  }

   onSubmit() {
    this.Message = "";
    this.addRegionService.create(new Region(1, this.Name, this.CountryId)).subscribe(x => this.Message="Region added successfuly!", 
      x => this.Message=x.json().Message);
    this.Name = "";
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
