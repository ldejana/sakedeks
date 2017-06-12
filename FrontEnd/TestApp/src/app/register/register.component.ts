import { Component, OnInit } from '@angular/core';
import {RegisterData} from './register-data.model';
import { RegisterService } from './register.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
   Email: string;
   Password: string;
   ConfirmPassword: string;
   Name: string;
   LastName: string;
   Role: string;
   isManager: boolean = false;
   Message: string = "";

  constructor(private registerService: RegisterService, private router: Router) { 
  }

  ngOnInit() {
  }

  onSubmit() {
    this.Message = "";
    if (this.isManager){
      this.Role = "Manager";
    } else {
      this.Role = "AppUser";
    }
    this.registerService.register(new RegisterData(this.Email, this.Password, this.ConfirmPassword,
      this.Name, this.LastName, this.Role)).subscribe(x => {this.Message="Successful registration";
      this.router.navigate(['login'])}, x => this.Message=x.json().Message);

    this.Name = "";
    this.Email = "";
    this.Password = "";
    this.ConfirmPassword = "";
    this.LastName = "";
    this.Role = "";
  }

  onChange () {
    if (this.isManager){
      this.isManager = false;
    } else{
      this.isManager = true;
    }
  }


  mon(e){
    if(e.target.checked){
      this.isManager = true;
    } else {
      this.isManager = false;
    }
  }

}
