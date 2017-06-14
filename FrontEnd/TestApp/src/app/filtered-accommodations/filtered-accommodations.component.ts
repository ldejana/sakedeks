import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FilteredAccommodationsService } from './filtered-accommodations.service';

@Component({
  selector: 'app-filtered-accommodations',
  templateUrl: './filtered-accommodations.component.html',
  styleUrls: ['./filtered-accommodations.component.css'],
  providers: [FilteredAccommodationsService]
})
export class FilteredAccommodationsComponent implements OnInit {

  Name: string;
  PlaceName: string;
  RegionName: string;
  Accommodations: Accommodation[];
  CountryName: string;
  AverageGrade: number;
  BedCount: number;
  MinPrice: number;
  MaxPrice: number;

  constructor(private activatedRoute: ActivatedRoute, private filteredAccService: FilteredAccommodationsService) {
    activatedRoute.params.subscribe(params => {this.Name = params["Name"];
                                               this.PlaceName = params["PlaceName"];
                                               this.RegionName = params["RegionName"];
                                               this.CountryName = params["CountryName"];
                                               this.AverageGrade = params["AverageGrade"];
                                               this.BedCount = params["BedCount"];
                                               this.MinPrice = params["MinPrice"];
                                               this.MaxPrice = params["MaxPrice"]});
    this.Accommodations = [];
   }

  ngOnInit() {
      this.filteredAccService.getAccommodations(this.Name, this.PlaceName, this.RegionName, 
      this.CountryName, this.AverageGrade, this.BedCount, this.MinPrice, this.MaxPrice).subscribe(x => this.Accommodations = x.json())
  }

}
