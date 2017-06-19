import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [NotificationService, HttpService]
})
export class NotificationsComponent implements OnInit {

  isConnected: Boolean;
  notifications: string[];

  constructor(private notifService: NotificationService, private ngZone: NgZone, private http: HttpService,
  private authService: AuthService) { 
    this.isConnected = false;
    this.notifications = [];
  }

  ngOnInit() {
    this.checkConnection();
    this.subscribeForNotifications();
    this.subscribeForAdminsNotifications();
  }

  private checkConnection(){
    this.notifService.connectionEstablished.subscribe(e => { this.isConnected = e; });
  }

  private subscribeForNotifications () {
    this.notifService.notificationReceived.subscribe(e => this.onNotification(e));
  }

  public onNotification(notif: string) {

     this.ngZone.run(() => { 
       this.notifications.push(notif);  
    });  
  }

  private subscribeForAdminsNotifications () {
    this.notifService.disapprovedAccReceived.subscribe(e => this.onDisapprovedAccReceived(e));
  }

  public onDisapprovedAccReceived(notif) {

     this.ngZone.run(() => { 
       document.getElementById("disapprovedAccsButton").style.color = "red";  
    });  
  }

  public onClick() {
    if (this.isConnected) {
      this.http.click().subscribe(data => console.log(data));
    }
  }

  isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  isManager() : boolean{
    return this.authService.getRole() == "Manager";
  }

  clearNotifications() {
    this.notifications = [];
  }

}
