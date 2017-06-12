import { Component, OnInit } from '@angular/core';
import { Accommodation } from './accommodation.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AccommodationService } from './accommodation.service';
import { User } from '../models/user.model';
import { Place } from '../place/place.model';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  providers: [AccommodationService]
})
export class AccommodationComponent implements OnInit {

  accommodationId: number;
  accommodation: Accommodation;
  accommodations: Accommodation[];

  constructor(private accommodationService: AccommodationService, private router: Router, private activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe(params => {this.accommodationId = params["Id"];});
    this.accommodation = new Accommodation();
    this.accommodation.Owner = new User();
    this.accommodation.Place = new Place();
  }

  ngOnInit() {
    this.accommodationService.getById(this.accommodationId).subscribe(x => { this.accommodations = x.json();
       this.accommodation = this.accommodations[0]});
  }

}
