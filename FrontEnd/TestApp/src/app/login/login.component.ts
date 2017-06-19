import { Component, OnInit, NgZone } from '@angular/core';
import { LoginService } from './login.service'
import { LoginData } from './login-data.model'
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';
import { User } from '../users/user.model';
import { UserBan } from '../services/user-ban.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, AuthService, ErrorHandlerService, UserBan]
})
export class LoginComponent implements OnInit {
  Username: string;
  Password: string;
  Message: string;
  user: User;

  constructor(private loginService: LoginService, private authService: AuthService, 
              private router: Router, private errorHandlerService: ErrorHandlerService,) {
                this.user = new User();

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
        if (this.authService.getRole() != "Admin") {
          this.authService.getUserById().subscribe(x => { 
          this.user = x.json(); UserBan.isBanned = this.user.IsBanned; 
        });
      }
  }, 
      x => { this.Message = this.errorHandlerService.parseError(x); });

    //this.Username = "";
    //this.Password = "";
  }

}
