import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { HttpService } from '../services/http.service'

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [NotificationService, HttpService]
})
export class NotificationsComponent implements OnInit {

  isConnected: Boolean;
  notifications: string[];

  constructor(private notifService: NotificationService, private ngZone: NgZone, private http: HttpService) { 
    this.isConnected = false;
    this.notifications = [];
  }

  ngOnInit() {
    this.checkConnection();
    this.subscribeForNotifications();
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

  public onClick() {
    if (this.isConnected) {
      this.http.click().subscribe(data => console.log(data));
    }
  }

}