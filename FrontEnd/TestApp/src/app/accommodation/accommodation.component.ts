import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from './accommodation.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AccommodationService } from './accommodation.service';
import { User } from '../models/user.model';
import { Place } from '../place/place.model';
import { AuthService } from '../services/auth.service';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { ConfigurationManager } from '../services/configuration-manager.service';
import {MapInfo} from "../map/map-info.model";


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
  ImageUrl: string;
  mapInfo: MapInfo
  

  constructor(private accommodationService: AccommodationService, private router: Router, private activatedRoute: ActivatedRoute,
    private authService: AuthService) { 

    activatedRoute.params.subscribe(params => {this.accommodationId = params["Id"];});

    this.accommodation = new Accommodation();
    this.accommodation.Owner = new User();
    this.accommodation.Place = new Place();
    this.accommodation.AccommodationType = new AccommodationType();
    this.mapInfo = new MapInfo(0, 0, "", "" , "" , "");

  }

  ngOnInit() {
      
     
      this.accommodationService.getById(this.accommodationId).subscribe(x => { this.accommodations = x.json();
        this.accommodation = this.accommodations[0];

        this.mapInfo = new MapInfo(this.accommodation.Latitude, this.accommodation.Longitude, "",
                      this.accommodation.Name, "" , "");
        
        let host = ConfigurationManager.Host;
        let imgurl = this.accommodation.ImageUrl;
        this.ImageUrl = `http://${host}/${imgurl}`;
    });

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
      let managerId = this.authService.getUserId();
      this.router.navigate(['/accommodationList', managerId, "My", 'Manager',"empty"])}, 
      x => alert(x.json().Message));
  }

  editAcc(id, name, desc, address, latitude, longitude, averageGr, approved, accTypeId, placeId,ownerId, imageUrl) {
    this.router.navigate(['/editAcc', id, name, desc, address, latitude, longitude, averageGr, approved, accTypeId, placeId, ownerId, imageUrl]);
  }

  

}
