import { Component, OnInit, Input } from '@angular/core';
import { Region } from './region.model';
import { Place } from '../place/place.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionService } from './region.service';
import { AuthService } from '../services/auth.service';

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

  constructor(private regionService: RegionService, private router: Router, private activatedRoute: ActivatedRoute,
    private authService: AuthService) { 

      activatedRoute.params.subscribe(params => {this.regionId = params["Id"]; this.countryName = params["CountryName"]});
      this.region = new Region();
  }

  ngOnInit() {
    this.regionService.getById(this.regionId).subscribe(x => { this.region = x.json() }); 
  }

  isAdmin(): boolean {
    return this.authService.getRole()=="Admin";
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  deleteRegion(id) {
    let countryId = this.region.CountryId;
    this.regionService.delete(id).subscribe(x => {alert("Region deleted successfuly!");
      this.router.navigate(['/country', countryId]);}, 
      x => alert(x.json().Message));
  }

  editRegion(id, name, countryId, countryName) {
    this.router.navigate(['/editRegion', id, name, countryId, countryName]);
  }

  addPlace() {
    this.regionService.getById(this.regionId).subscribe(x => { this.region = x.json() });
  }

}
