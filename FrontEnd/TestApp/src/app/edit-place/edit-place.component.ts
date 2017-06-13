import { Component, OnInit } from '@angular/core';
import { Place } from '../place/place.model';
import { EditPlaceService } from './edit-place.service';
import { Origins } from '../enumerations/origins.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css'],
  providers: [EditPlaceService]
})
export class EditPlaceComponent implements OnInit {

  Id: number;
  PlaceName: string;
  RegionId: number;
  Path: string;
  Origin: Origins = 'Place';

  constructor(private editPlaceService: EditPlaceService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]; this.PlaceName = params["PlaceName"];
      this.RegionId = params["RegionId"]; this.Path = params["Path"]});
   }

  ngOnInit() {
  }

  onSubmit() {
    this.editPlaceService.edit(new Place(this.Id, this.PlaceName, this.RegionId)).subscribe(x => 
      {this.router.navigate(['/accommodationList', this.Id, this.Path, this.Origin, this.PlaceName])}, 
      x => alert(x.json().Message));
  }

}
