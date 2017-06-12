import { Component, OnInit, Input } from '@angular/core';
import { Region } from './region.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionService } from './region.service';

@Component({
  selector: 'region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers: [RegionService]
})
export class RegionComponent implements OnInit {

  region: Region;
  regionId: number;
  countryName: string;

  constructor(private regionService: RegionService, private router: Router, private activatedRoute: ActivatedRoute) { 
      activatedRoute.params.subscribe(params => {this.regionId = params["Id"]; this.countryName = params["CountryName"]});
      this.region = new Region();
  }

  ngOnInit() {
    this.regionService.getById(this.regionId).subscribe(x => { this.region = x.json() }); 
  }

}
