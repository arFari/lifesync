import { Component } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Property to hold our error message
  showError: boolean = false; // Flag to show or hide the error message
  showPassword: boolean = false;

  constructor(private databaseService: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.checkSessionStorage();
  }

  login() {
    this.databaseService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        sessionStorage.setItem('authToken', response.result); // Assuming the token is named 'token'
        this.router.navigate(['']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login failed', error);
        this.errorMessage = 'Incorrect username or password'; // Set the error message
        this.showError = true; // Show the error message
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  checkSessionStorage() {
    const userToken = sessionStorage.getItem('authToken');
    if (userToken) {
      console.log('Token found in sessionStorage:', userToken);
      this.router.navigate(['']);
    } else {
      console.log('No token found in sessionStorage.');
    }
  }
}
