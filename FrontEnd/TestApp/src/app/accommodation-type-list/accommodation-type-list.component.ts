import { Component, OnInit } from '@angular/core';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { AccommodationTypeListService } from './accommodation-type-list.service';
import { AuthService } from '../services/auth.service'
import {Accommodation} from '../accommodation/accommodation.model';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

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

  constructor(private accommodationTypeSerice: AccommodationTypeListService, private router: Router,
    private authService: AuthService) { 

    this.accommodationTypes = [];
  }

  ngOnInit() {
    this.accommodationTypeSerice.getAll().subscribe( x => this.accommodationTypes=x.json());
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

  deleteAccType(id) {
    this.Message = "";
    this.accommodationTypeSerice.delete(id).subscribe(x => this.Message="Accommodation type deleted successfuly!", 
      x => this.Message=x.json().Message)
  }

  editAccType(id, name){
    this.router.navigate(['/editAccType', id, name]);
  }

}
