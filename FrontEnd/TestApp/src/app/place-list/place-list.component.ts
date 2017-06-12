import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Place } from '../place/place.model';
import { PlaceListService } from './place-list.service';
import { Region } from '../region/region.model';
import { Router, ActivatedRoute } from "@angular/router";
import { Origins } from '../enumerations/origins.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers: [ PlaceListService ]
})
export class PlaceListComponent implements OnInit, OnChanges {
 
  @Input() region : Region;
  places: Place[];
  Origin: Origins = 'Place';
  @Input() countryName: string;
  path: string;

  constructor(private placeListService: PlaceListService, private router: Router, private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.region.Id != undefined) {
      this.path = this.countryName + ' >> ' + this.region.Name;
      this.placeListService.getAll(this.region.Id).subscribe(x => { this.places = x.json() });
    }
  }

  isAdmin(): boolean {
    return this.authService.getRole()=="Admin";
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  deletePlace(id) {
    let regionId = this.region.Id;
    this.placeListService.delete(id).subscribe(x => {
      let index: number = -1;
      let i: number = 0;
      for (let place of this.places) {
        if (place.Id == id){
          index = i;
          break;
        }
        i = i+1;
      }
      if (index !== -1) {
        this.places.splice(index, 1);
      }
    }, 
      x => alert(x.json().Message));
  }

  editPlace(id, placeName, regionId, path) {
    this.router.navigate(['/editPlace', id, placeName, regionId, path]);
  }

}
