import { Component, OnInit, NgZone } from '@angular/core';
import { LoginService } from './login.service'
import { LoginData } from './login-data.model'
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, AuthService, ErrorHandlerService]
})
export class LoginComponent implements OnInit {
  Username: string;
  Password: string;
  Message: string;

  constructor(private loginService: LoginService, private authService: AuthService, 
              private router: Router, private errorHandlerService: ErrorHandlerService,) {

   }

  ngOnInit() {
    /*if (this.authService.isLoggedIn()){
      this.router.navigate(['/home']);
    }*/
  }

  onSubmit() {

    let userName = this.Username;
    this.loginService.login(new LoginData(this.Username, this.Password)).subscribe( 
      x => {this.authService.logIn(x); this.router.navigate(['/']);
  }, 
      x => { this.Message = this.errorHandlerService.parseError(x); });

    //this.Username = "";
    //this.Password = "";
  }

}
