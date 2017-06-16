import { Component, OnInit } from '@angular/core';
import {Accommodation} from '../accommodation/accommodation.model';
import {AccommodationListService} from './accommodation-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Origins } from '../enumerations/origins.model';
import { PagingService } from '../services/paging.service';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  providers: [AccommodationListService, PagingService]
})
export class AccommodationListComponent implements OnInit {

  Id: number;
  path: string;
  origin: Origins;
  Accommodations: Accommodation[];
  placeName: string;
  counter: Array<number>;
  PageSet: number = 1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private accListService: AccommodationListService,
      private pagingService: PagingService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]; 
                                               this.path = params["Name"]; 
                                               this.origin = params["Origin"];
                                               this.placeName = params["PlaceName"]});
   }

  ngOnInit() {
    this.Accommodations = [];

      switch(this.origin) {
        case 'AccommodationType': 
            this.accListService.getByAccTypeId(this.Id, 1, PagingService.PageSize).subscribe(x => {
              this.Accommodations = (x.json()).value;
              this.pagingService.initPagingService(x);

              let counterLength = 2;
              if (this.PageSet * 2 > PagingService.PageNumber) {
                  counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
              } 
              this.counter = new Array(counterLength);
          }); break;
        case 'Place': {
            this.accListService.getByPlaceId(this.Id, 1, PagingService.PageSize).subscribe(x => {
              this.Accommodations = (x.json()).value;
              this.pagingService.initPagingService(x);

              let counterLength = 2;
              if (this.PageSet * 2 > PagingService.PageNumber) {
                  counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
              } 
              this.counter = new Array(counterLength);
            });
            this.path = this.path + " >> " + this.placeName;
            break;
        }
        default: break;
      }
  }

  changePage(pageNumber: number){
    switch(this.origin) {
        case 'AccommodationType':
          this.accListService.getByAccTypeId(this.Id, pageNumber, PagingService.PageSize).subscribe(x => {
              this.Accommodations = (x.json()).value; 
            });
        break;
        case 'Place': {
          this.accListService.getByPlaceId(this.Id, pageNumber, PagingService.PageSize).subscribe(x => {
              this.Accommodations = (x.json()).value; 
            });
          break;
        }
        default: break;
      }
  }

  showNext():boolean {
        return (this.PageSet * 2) < PagingService.PageNumber;
    }

  showPrevious():boolean {
        return this.PageSet > 1;
  }

  nextPageSet() {
      this.PageSet = this.PageSet + 1;
      let counterLength = 2;
      if (this.PageSet * 2 > PagingService.PageNumber) {
          counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
      } 
      this.counter = new Array(counterLength);
  }

  previousPageSet() {
    this.PageSet = this.PageSet - 1;
      let counterLength = 2;
      if (this.PageSet * 2 > PagingService.PageNumber) {
          counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
      } 
      this.counter = new Array(counterLength);
  }

}
