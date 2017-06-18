import { Component, OnInit } from '@angular/core';
import {Accommodation} from '../accommodation/accommodation.model';
import {AccommodationListService} from './accommodation-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Origins } from '../enumerations/origins.model';
import { PagingService } from '../services/paging.service';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  providers: [AccommodationListService, PagingService, HttpService]
})
export class AccommodationListComponent implements OnInit {

  Id: number;
  path: string;
  origin: Origins;
  Accommodations: Accommodation[];
  placeName: string;
  counter: Array<number>;
  PageSet: number = 1;
  selectedButton: number = 1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private accListService: AccommodationListService,
      private pagingService: PagingService, private authService: AuthService, private http: HttpService) {
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
        case 'Disapproved' : {
          this.accListService.getDisapprovedAccs(1, PagingService.PageSize).subscribe(x => {
              this.Accommodations = (x.json()).value;
              this.pagingService.initPagingService(x);

              let counterLength = 2;
              if (this.PageSet * 2 > PagingService.PageNumber) {
                  counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
              } 
              this.counter = new Array(counterLength);
            });
          break;
        }
        default: break;
      }
  }

  changePage(pageNumber: number){
    this.selectedButton = pageNumber;

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
        case 'Disapproved': {
          this.accListService.getDisapprovedAccs(pageNumber, PagingService.PageSize).subscribe(x => {
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

      this.changePage((this.PageSet -1)*2 + 1);
  }

  previousPageSet() {
    this.PageSet = this.PageSet - 1;
      let counterLength = 2;
      if (this.PageSet * 2 > PagingService.PageNumber) {
          counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
      } 
      this.counter = new Array(counterLength);

      this.changePage((this.PageSet -1)*2 + 1);
  }

  isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.getRole() == "Admin";
  }

  isDisapprovedOrigin(): boolean {
    return this.origin == 'Disapproved';
  }

  approve(id: number){
    this.http.approveAccommodation(id).subscribe( x => {
      let index: number = -1;
      let i: number = 0;
      for (let acc of this.Accommodations) {
        if (acc.Id == id){
          index = i;
          break;
        }
        i = i+1;
      }
      if (index !== -1) {
        this.Accommodations.splice(index, 1);
      }
    });
  }

}
