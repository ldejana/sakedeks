import { Component, OnInit } from '@angular/core';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { EditAccTypeService } from './edit-acc-type.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-acc-type',
  templateUrl: './edit-acc-type.component.html',
  styleUrls: ['./edit-acc-type.component.css'],
  providers: [EditAccTypeService]
})
export class EditAccTypeComponent implements OnInit {

  Name: string;
  Id: number;
  Message: string = "";

  constructor(private editAccTypeService: EditAccTypeService, private activatedRoute: ActivatedRoute, private router: Router) { 
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]; this.Name = params["Name"]});
  }

  ngOnInit() {
  }

  onSubmit() {
    this.Message = "";
    this.editAccTypeService.edit(new AccommodationType(this.Id, this.Name)).subscribe(
      x => { this.Message="Accommodation type edited successfuly!"; this.router.navigate(['/accommodationTypeList']); }, 
      x => this.Message=x.json().Message);
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
