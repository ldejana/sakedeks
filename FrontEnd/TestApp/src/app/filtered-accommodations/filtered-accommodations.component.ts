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
  Accommodations: Accommodation[];

  constructor(private activatedRoute: ActivatedRoute, private filteredAccService: FilteredAccommodationsService) {
    activatedRoute.params.subscribe(params => {this.Name = params["Name"];
                                               this.PlaceName = params["PlaceName"]});
    this.Accommodations = [];
   }

  ngOnInit() {
      this.filteredAccService.getAccommodations(this.Name, this.PlaceName).subscribe(x => this.Accommodations = x.json())
  }

}
