import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {

  Name: string;
  PlaceName: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.Name == undefined || this.Name == ""){
      this.Name = "undefinded";
    }
    if (this.PlaceName == undefined || this.PlaceName == ""){
      this.PlaceName = "undefinded";
    }
    this.router.navigate(['/filteredAccommodations', this.Name, this.PlaceName]);
  }

}
