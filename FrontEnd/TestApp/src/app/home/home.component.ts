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
  AccName: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]; this.AccName = params["AccName"]});
   }

  ngOnInit() {
    this.router.navigate(['/accommodationType', this.Id, this.AccName]);
  }

}
