import { Component, OnInit } from '@angular/core';
import {Accommodation} from '../accommodation/accommodation.model';
import {AccommodationTypeService} from './accommodation-type.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'accommodation-type',
  templateUrl: './accommodation-type.component.html',
  styleUrls: ['./accommodation-type.component.css'],
  providers: [AccommodationTypeService]
})
export class AccommodationTypeComponent implements OnInit {

  Id: number = -1;
  Accomodations: Accommodation[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private accTypeService: AccommodationTypeService) { 
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]});
  }

  ngOnInit() {
    this.Accomodations = [];
    this.accTypeService.getByAccTypeId(this.Id).subscribe(x => this.Accomodations = x.json());
  }
  

}
