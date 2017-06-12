import { Component, OnInit } from '@angular/core';
import { Region } from '../region/region.model';
import { EditRegionService } from './edit-region.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'edit-region',
  templateUrl: './edit-region.component.html',
  styleUrls: ['./edit-region.component.css'],
  providers: [EditRegionService]
})
export class EditRegionComponent implements OnInit {

  Id: number;
  Name: string;
  CountryId: number;
  CountryName: string;

  constructor(private editRegionService: EditRegionService, private activatedRoute: ActivatedRoute, private router: Router) {
      activatedRoute.params.subscribe(params => {this.Id = params["Id"]; this.Name = params["Name"];
      this.CountryId = params["CountryId"]; this.CountryName = params["CountryName"]});
   }

  ngOnInit() {
  }

  onSubmit() {
    this.editRegionService.edit(new Region(this.Id, this.Name, this.CountryId)).subscribe(x => 
      {this.router.navigate(['/region', this.Id, this.CountryName])}, 
      x => alert(x.json().Message));
  }

}
