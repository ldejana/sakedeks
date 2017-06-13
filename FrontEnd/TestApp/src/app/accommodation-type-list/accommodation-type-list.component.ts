import { Component, OnInit } from '@angular/core';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { AccommodationTypeListService } from './accommodation-type-list.service';
import { AuthService } from '../services/auth.service';
import {Accommodation} from '../accommodation/accommodation.model';
import {Router,ActivatedRoute} from '@angular/router';
import { Origins } from "app/enumerations/origins.model";

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
  Origin: Origins = "AccommodationType";

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


   deleteAccommodationType(id: number) {
   this.Message = "";

    this.accommodationTypeService.deleteAccommodationType(id).subscribe(
        x => {  this.Message="Accommodation type deleted successfuly!";

                let index: number = -1;
                let i: number = 0;
                for (let accType of this.accommodationTypes) {
                  if (accType.Id == id){
                    index = i;
                    break;
                  }
                  i = i+1;
                }
                if (index !== -1) {
                  this.accommodationTypes.splice(index, 1);
                }
              }, 

       x => alert(x.json().Message));
  }

   editAccommodationType(id: number, name: string) {
      this.router.navigate(['/editAccommodationType', id, name]);
   }
}
