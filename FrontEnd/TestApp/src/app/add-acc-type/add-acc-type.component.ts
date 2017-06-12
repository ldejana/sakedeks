import { Component, OnInit } from '@angular/core';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { AddAccTypeService } from './add-acc-type.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'add-acc-type',
  templateUrl: './add-acc-type.component.html',
  styleUrls: ['./add-acc-type.component.css'],
  providers: [AddAccTypeService]
})
export class AddAccTypeComponent implements OnInit {

  Name: string;
  Message: string = "";

  constructor(private addAccTypeService: AddAccTypeService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.Message = "";

    this.addAccTypeService.create(new AccommodationType(1, this.Name)).subscribe(x => {this.Message="Accommodation type added successfuly!"}, 
      x => this.Message=x.json().Message);
    this.Name = "";
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
