import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'accommodation-type',
  templateUrl: './accommodation-type.component.html',
  styleUrls: ['./accommodation-type.component.css']
})
export class AccommodationTypeComponent implements OnInit {

  Id: string = "-1";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]});
  }

  ngOnInit() {
  }

}
