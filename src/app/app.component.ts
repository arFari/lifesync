import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }
  title = 'webhack';
  public showNavBar = true;

  toggleNavBar(component: any) {
    if (component instanceof LoginComponent) {
      this.showNavBar = false;
    }
    else if (component instanceof RegisterComponent) {
      this.showNavBar = false;
    }
    else {
      this.showNavBar = true;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}

