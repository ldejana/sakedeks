import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {

  Name: string;
  PlaceName: string;
  RegionName: string;
  CountryName: string;
  AverageGrade: number;
  BedCount: number;
  MinPrice: number;
  MaxPrice: number;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.Name == undefined || this.Name == ""){
      this.Name = "undefined";
    }
    if (this.PlaceName == undefined || this.PlaceName == ""){
      this.PlaceName = "undefined";
    }

    if (this.RegionName == undefined || this.RegionName == ""){
      this.RegionName = "undefined";
    }

    if (this.CountryName == undefined || this.CountryName == ""){
      this.CountryName = "undefined";
    }

    if (this.AverageGrade == undefined){
      this.AverageGrade = -1;
    }

    if (this.BedCount == undefined){
      this.BedCount = -1;
    }

    if (this.MinPrice == undefined){
      this.MinPrice = -1;
    }

    if (this.MaxPrice == undefined){
      this.MaxPrice = -1;
    }

    this.router.navigate(['/filteredAccommodations', this.Name, this.PlaceName, this.RegionName, this.CountryName, this.AverageGrade,
                          this.BedCount, this.MinPrice, this.MaxPrice]);
  }

}
