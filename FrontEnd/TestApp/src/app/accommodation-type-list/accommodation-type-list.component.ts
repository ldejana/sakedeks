import { Component, OnInit } from '@angular/core';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { AccommodationTypeListService } from './accommodation-type-list.service';
import { AuthService } from '../services/auth.service';
import {Accommodation} from '../accommodation/accommodation.model';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'accommodation-type-list',
  templateUrl: './accommodation-type-list.component.html',
  styleUrls: ['./accommodation-type-list.component.css'],
  providers: [AccommodationTypeListService]
})
export class AccommodationTypeListComponent implements OnInit {

  accommodationTypes: AccommodationType[];
  accommodation: AccommodationType;
  Message: string = "";

  constructor(private accommodationTypeService: AccommodationTypeListService, private router: Router,
    private authService: AuthService) { 

    this.accommodationTypes = [];
  }

  ngOnInit() {
    this.getAccommodationTypes()
  }

  showAddAccTypeForm() {
    this.router.navigate(['/addAccType']);
  }

  isAdmin(): boolean {
    return this.authService.getRole()=="Admin";
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getAccommodationTypes() {
    this.accommodationTypeService.getAll().subscribe( x => this.accommodationTypes=x.json());
  }
}
