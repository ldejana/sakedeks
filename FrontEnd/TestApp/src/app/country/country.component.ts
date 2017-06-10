import { Component, OnInit, Input } from '@angular/core';
import { Country } from './country.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryService } from './country.service';

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountryService]
})
export class CountryComponent implements OnInit {

  country: Country;
  countryId: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private countryService: CountryService) {
    activatedRoute.params.subscribe(params => {this.countryId = params["Id"]});

      this.country = new Country();
   }

  ngOnInit() {
     this.countryService.getById(this.countryId).subscribe(x => { this.country = x.json() });
    
  }

}
