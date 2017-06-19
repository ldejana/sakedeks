import { Component, NgZone } from '@angular/core';
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
  userName: string = "";
  origin: Origins = 'Manager';
  buttonColor: string = "red";
  isConnected: Boolean = false;

  constructor(private authService: AuthService, private router: Router){
  }

  ngOnInit() {
    this.isLoggedIn();
    
  }



  isLoggedIn() : boolean{
    let retValue = this.authService.isLoggedIn();

    if (retValue) {
      this.userName = this.authService.getUserName();
    }

    return retValue;
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
    document.getElementById("disapprovedAccsButton").style.color = "black"; 
    let self = this.disapproved;
    this.router.navigate(['/accommodationList', 1, self, self, self]);
  }

  showManagers() {
    let role = "Manager";
    this.router.navigate(['/home', "showUsers", role]);
  }

  isUserBanned() {
    return UserBan.isBanned;
  }

  showAppUsers() {
    let role = "AppUser";
    this.router.navigate(['/home', "showUsers", role]);
  }

  managersAccommodations() {
    let managerId = this.authService.getUserId();
    this.router.navigate(['/accommodationList', managerId, "My", this.origin, "empty"]);
  }
}
