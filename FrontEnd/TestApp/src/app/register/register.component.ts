import { Component, OnInit } from '@angular/core';
import {RegisterData} from './register-data.model';
import { RegisterService } from './register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ RegisterService, ErrorHandlerService ]
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
   Manager: string;

  constructor(private registerService: RegisterService, private router: Router, 
              private activatedRoute: ActivatedRoute, private errorHandlerService: ErrorHandlerService) { 
    activatedRoute.params.subscribe(params => {this.Manager = params["Manager"];});
  }

  ngOnInit() {
  }

  onSubmit() {
    this.Message = "";
    if (this.Manager == "manager"){
      this.Role = "Manager";
    } else {
      this.Role = "AppUser";
    }
    this.registerService.register(new RegisterData(this.Email, this.Password, this.ConfirmPassword,
      this.Name, this.LastName, this.Role, false)).subscribe(
        x => {this.Message="Successful registration"; this.router.navigate(['login'])},
        x => { this.Message = this.errorHandlerService.parseError(x); });

    this.Name = "";
    this.Email = "";
    this.Password = "";
    this.ConfirmPassword = "";
    this.LastName = "";
    this.Role = "";
  }

}
