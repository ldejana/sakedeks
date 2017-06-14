import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from './accommodation.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AccommodationService } from './accommodation.service';
import { User } from '../models/user.model';
import { Place } from '../place/place.model';
import { AuthService } from '../services/auth.service';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Component({
  selector: 'accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  providers: [AccommodationService]
})
export class AccommodationComponent implements OnInit {

  accommodationId: number;
  accommodation: Accommodation;
  accommodations: Accommodation[];
  placeName: string;
  @Input() accId: number;
  ImageUrl: string;

  constructor(private accommodationService: AccommodationService, private router: Router, private activatedRoute: ActivatedRoute,
    private authService: AuthService) { 

    activatedRoute.params.subscribe(params => {this.accommodationId = params["Id"];});

    this.accommodation = new Accommodation();
    this.accommodation.Owner = new User();
    this.accommodation.Place = new Place();
    this.accommodation.AccommodationType = new AccommodationType();
  }

  ngOnInit() {
    if (this.accId != undefined){
      this.accommodationService.getById(this.accId).subscribe(x => { this.accommodations = x.json();
        this.accommodation = this.accommodations[0]});
    } else if (this.accommodationId != undefined) {
      this.accommodationService.getById(this.accommodationId).subscribe(x => { this.accommodations = x.json();
        this.accommodation = this.accommodations[0]});
    }

    let host = ConfigurationManager.Host;
    this.ImageUrl = `http://${host}/` + this.accommodation.ImageUrl;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isManager() : boolean{
    return this.authService.getRole() == "Manager";
  }

  isMyAcc(ownerId: number): boolean {
    return this.authService.getOwnerId() == ownerId;
  }

  deleteAcc(id) {
    this.accommodationService.delete(id).subscribe(x => {alert("Accommodation deleted successfuly!");
      this.router.navigate(['/accommodationList', this.accommodation.PlaceId, "Place", "Place", this.accommodation.Place.Name])}, 
      x => alert(x.json().Message));
  }

  editAcc(id, name, desc, address, latitude, longitude, averageGr, /*imageUrl, dodaj kasnije*/ approved, accTypeId, placeId,ownerId) {
    this.router.navigate(['/editAcc', id, name, desc, address, latitude, longitude, averageGr, /*imageUrl,*/ approved, accTypeId, placeId, ownerId]);
  }

}
