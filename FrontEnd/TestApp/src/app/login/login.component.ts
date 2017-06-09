import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { LoginData } from './login-data.model'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, AuthService]
})
export class LoginComponent implements OnInit {
  Username: string;
  Password: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit() {

    this.loginService.login(new LoginData(this.Username, this.Password)).subscribe();

    this.Username = "";
    this.Password = "";
  }

}
