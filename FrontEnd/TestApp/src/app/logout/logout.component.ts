import { Component, OnInit } from '@angular/core';
import { LogoutService } from './logout.service';
import { AuthService } from '../services/auth.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [LogoutService, AuthService]
})
export class LogoutComponent implements OnInit {

  constructor(private logoutService: LogoutService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout().subscribe(x => {this.authService.logOut(); this.router.navigate(['/login']);});
    
  }

}
