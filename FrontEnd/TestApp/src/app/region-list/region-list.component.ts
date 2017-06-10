import { Component, OnInit } from '@angular/core';
import { RegionListService } from './region-list.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css'],
  providers: [RegionListComponent]
  
})
export class RegionListComponent implements OnInit {

  countryId: number;

  constructor(private regionListService: RegionListService, private router: Router, private activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(params => {this.countryId = params["countryId"]});

    
   }

  ngOnInit() {
     
  }

}
