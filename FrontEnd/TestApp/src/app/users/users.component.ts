import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { AuthService } from '../services/auth.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { UserBan } from '../services/user-ban.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, UserBan]
})
export class UsersComponent implements OnInit {

  users: User[];
  origin: string;

  constructor(private userService: UserService, private router: Router, private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
    this.users = [];
    activatedRoute.params.subscribe(params => {this.origin = params["Role"];});
   }

  ngOnInit() {
    this.userService.getAll().subscribe(x => this.users = x.json());
  }

  isManagerPage() {
    return this.origin == "Manager";
  }

  ban(id) {
    this.userService.ban(id).subscribe( x => {
      this.userService.getAll().subscribe(x => this.users = x.json());
    } );
  }

  unban(id) {
    this.userService.unban(id).subscribe( x => {
      this.userService.getAll().subscribe(x => this.users = x.json());
    });
  }

}
