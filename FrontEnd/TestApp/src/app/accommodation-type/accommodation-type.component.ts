import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {AccommodationType} from '../accommodation-type/accommodation-type.model';
import {AccommodationTypeService} from './accommodation-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Origins } from '../enumerations/origins.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'accommodation-type',
  templateUrl: './accommodation-type.component.html',
  styleUrls: ['./accommodation-type.component.css'],
  providers: [AccommodationTypeService]
})
export class AccommodationTypeComponent implements OnInit {
  
  Id: number = -1;
  AccommodationTypeName: string;
  Origin: string;
  Message: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private accommodationTypeService: AccommodationTypeService,
              private authService: AuthService) { 
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]; 
                                               this.AccommodationTypeName = params["Name"];});
   
  }

  ngOnInit() {
     
   }

   deleteAccommodationType() {
    this.Message = "";
    this.accommodationTypeService.delete(this.Id).subscribe(
      x => {this.Message="Accommodation type deleted successfuly!"; 
            this.router.navigate(['/accommodationTypeList'])}, 
      x => this.Message=x.json().Message)
  }

   editAccommodationType() {
      this.router.navigate(['/editAccommodationType', this.Id, this.AccommodationTypeName]);
   }

   isAdmin(): boolean {
    return this.authService.getRole()=="Admin";
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
