import { Component, OnInit, NgZone } from '@angular/core';
import { Country } from '../country/country.model';
import { Region } from '../region/region.model';
import { Place } from '../place/place.model';
import { Accommodation } from '../accommodation/accommodation.model';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { CountryListService } from '../country-list/country-list.service';
import { RegionListService } from '../region-list/region-list.service';
import { PlaceListService } from '../place-list/place-list.service';
import { AccommodationTypeListService } from '../accommodation-type-list/accommodation-type-list.service';
import { AuthService } from '../services/auth.service';
import { AddAccommodationService } from './add-accommodation.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { NotificationService } from "app/services/notification.service";
import { HttpService } from "app/services/http.service";
import { UserBan } from '../services/user-ban.service';

@Component({
  selector: 'add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
  providers: [CountryListService, RegionListService, PlaceListService,
              AccommodationTypeListService, AddAccommodationService, HttpService, UserBan]
})
export class AddAccommodationComponent implements OnInit {

  Name: string;
  Description: string;
  Address: string;
  Latitude: number;
  Longitude: number;
  countries: Country[];
  CountryId: number;
  regions: Region[];
  RegionId: number;
  places: Region[];
  PlaceId: number;
  accTypes: AccommodationType[];
  AccommodationTypeId: number;
  placeName: string;
  ImageURL: File;
  file: File;
  isBannedManager: boolean = false;

  constructor(private countryListService: CountryListService, private regionListService: RegionListService,
    private placeListService: PlaceListService, private accTypeListService: AccommodationTypeListService, private authService: AuthService,
    private addAccommodationService: AddAccommodationService, private router: Router, private httpService: HttpService) {
    this.countries = [];
    this.regions = [];
    this.places = [];
    this.accTypes = [];
    this.isBannedManager = UserBan.isBanned;
   }

  ngOnInit() {
    this.countryListService.getAll().subscribe(x => this.countries = x.json());
    this.accTypeListService.getAll().subscribe(x => this.accTypes = x.json());
  }

  onCountryChange(selectedCountry) {
    if (selectedCountry == undefined || selectedCountry == ""){
      this.regions = [];
    } else {
      this.regionListService.getAll(this.CountryId).subscribe(x => this.regions = x.json());
      this.places = [];
    }
  }

  onRegionChange(selectedRegion) {
    if (selectedRegion == undefined || selectedRegion == ""){
      this.places = [];
    } else {
      this.placeListService.getAll(this.RegionId).subscribe(x => this.places = x.json());
    }
  }

  onSubmit() {
    let userId = this.authService.getOwnerId();
    this.findPlaceName(this.PlaceId);
    let placeName = this.placeName;
    let newAccommodation = new Accommodation(1, this.Name, this.Description, this.Address, 0, this.Latitude, this.Longitude, "", false,
      this.AccommodationTypeId, this.PlaceId, userId);

    this.addAccommodationService.create(newAccommodation, this.file).subscribe(x => 
    { this.httpService.notifyAdmin().subscribe();
      let managerId = this.authService.getUserId();
      this.router.navigate(['/accommodationList', managerId, "My", "Manager", "empty"]);}, 
      x => alert(x.json().Message));
  }

  findPlaceName(id: number) {
     this.placeName = "";

      for (let place of this.places) {
        if (place.Id == id){
          this.placeName = place.Name
          break;
        }
      }
  }

  onImageChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
  }

  isBanned() :boolean {
    return this.isBannedManager;
  }

}
