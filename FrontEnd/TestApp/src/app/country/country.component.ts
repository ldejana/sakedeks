import { Component, OnInit, Input } from '@angular/core';
import { Country } from './country.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryService } from './country.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountryService]
})
export class CountryComponent implements OnInit {

  country: Country;
  countryId: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private countryService: CountryService,
    private authService: AuthService) {

      activatedRoute.params.subscribe(params => {this.countryId = params["Id"]});
      this.country = new Country();
   }

  ngOnInit() {
     this.countryService.getById(this.countryId).subscribe(x => { this.country = x.json() });    
  }

  isAdmin(): boolean {
    return this.authService.getRole()=="Admin";
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  deleteCountry(id) {
    this.countryService.delete(id).subscribe(x => {alert("Country deleted successfuly!");
      this.router.navigate(['/countryList'])}, 
      x => alert(x.json().Message));
  }

  editCountry(id, name, code) {
    this.router.navigate(['/editCountry', id, name, code]);
  }

  addRegion() {
    this.countryService.getById(this.countryId).subscribe(x => { this.country = x.json() });
  }
}
