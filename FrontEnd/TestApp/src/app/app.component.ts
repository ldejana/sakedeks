import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService, private router: Router){
    
  }

  ngOnInit() {
    
  }

  isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  showLoginPage() {
    this.router.navigate(['/login']);
  }

  showRegistrationPage(){
    this.router.navigate(['/register']);
  }
}
