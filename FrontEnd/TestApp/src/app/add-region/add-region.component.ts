import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Region } from '../region/region.model';
import { AddRegionService } from './add-region.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css'],
  providers: [AddRegionService]
})
export class AddRegionComponent implements OnInit {

  Name: string;
  @Input() CountryId: number;
  Message: string = "";
  @Output() onRegionAdded: EventEmitter<Region>;

  constructor(private addRegionService: AddRegionService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.onRegionAdded = new EventEmitter();
   }

  ngOnInit() {
  }

   onSubmit() {
    this.Message = "";
    this.addRegionService.create(new Region(1, this.Name, this.CountryId)).subscribe(
      x => {this.Message="Region added successfuly!"; this.onRegionAdded.emit();}, 
      x => this.Message=x.json().Message);
    this.Name = "";
  }


}
