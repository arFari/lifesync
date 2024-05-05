import { Component } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  collectiblesPaths = [
    'bbokariFront',
    'dwaekkiFront',
    'foxinyFront',
    'jiniretFront',
    'leebitFront',
    'puppymFront',
    'quokkaFront',
    'wolfFront'
  ];
  username: string = '';
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  errorMessage: string = '';
  showError: boolean = false;
  showPassword: boolean = false;

  constructor(private databaseService: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.checkSessionStorage();
  }

  register() {
    const fullName = this.firstName + ' ' + this.lastName;
    this.databaseService.register(this.username, this.password, fullName).subscribe({
      next: (response: any) => {
        console.log('Registration successful', response);
        this.randomCollectibles(response.result);
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Registration failed', error);
        this.errorMessage = 'Registration failed'; // Set the error message
        this.showError = true; // Show the error message
      }
    });
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
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  randomCollectibles(id:any){
    const randomIndex = Math.floor(Math.random() * this.collectiblesPaths.length);
    let res = this.collectiblesPaths[randomIndex];
    this.databaseService.updateReward({
      id: id, 
      reward: res
    }).subscribe({
      next: (response) => {
        // Handle the successful update here
        console.log('Update successful', response);
      },
      error: (error) => {
        // Handle errors here
        console.log('Error updating reward:', error);
      },
      complete: () => {
        // Handle completion (if necessary)
        console.log('Update operation completed.');
      }
    });
  }
}
