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

  Id: number;
  Origin: string;
  Role: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
       this.Origin = params["Origin"];
       if (this.Origin == "addComm") {
         this.Id = params["Param"];
       } else if (this.Origin == "showUsers") {
          this.Role = params["Param"];
      }
    });
   }

  ngOnInit() {
    if (this.Origin == "addComm") {
      this.router.navigate(['/accommodation', this.Id]);
    } else if (this.Origin == "showUsers") {
      this.router.navigate(['users', this.Role]);
    }
  }

}
