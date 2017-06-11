import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Id: number = -1;
  Name: string;
  Origin: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]; this.Name = params["Name"]; this.Origin = params["Origin"]});
   }

  ngOnInit() {
    this.router.navigate(['/accommodationShow', this.Id, this.Name, this.Origin]);
  }

}
