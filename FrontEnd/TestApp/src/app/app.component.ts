import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Origins } from './enumerations/origins.model';
import { UserBan } from './services/user-ban.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserBan]
})
export class AppComponent {
  title = 'booking.com';
  disapproved: Origins = 'Disapproved';
  

  constructor(private authService: AuthService, private router: Router){
  }

  ngOnInit() {
  }

  isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  isManager() : boolean{
    return this.authService.getRole() == "Manager";
  }

  isAdmin(): boolean {
    return this.authService.getRole() == "Admin";
  }

  showLoginPage() {
    this.router.navigate(['/login']);
  }

  showRegistrationPage(){
    this.router.navigate(['/register']);
  }

  showCountries() {
    this.router.navigate(['/countryList']);
  }

  showAccommodationTypes() {
    this.router.navigate(['/accommodationTypeList']);
  }

  addAccommodation() {
    this.router.navigate(['/addAccommodation']);
  }

  showFilterPage() {
    this.router.navigate(['/filterForm']);
  }

  showReservations() {
    let userId = this.authService.getUserId();
    this.router.navigate(['/roomReservations', userId]);
  }

  showDisapprovedAcc() {
    let self = this.disapproved;
    this.router.navigate(['/accommodationList', 1, self, self, self]);
  }

  showManagers() {
    let role = "Manager";
    this.router.navigate(['users', role]);
  }

  isUserBanned() {
    return UserBan.isBanned;
  }
}
