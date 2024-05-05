import { Component } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collectibles',
  templateUrl: './collectibles.component.html',
  styleUrls: ['./collectibles.component.css']
})
export class CollectiblesComponent {
  user: any = {
    name: '',
    categories: [],
    time_spent: [],
  };
  currentUserId = "";
  progress = 0;
  constructor(private dbService: DatabaseService, private router: Router) {}

  async ngOnInit() {
    this.checkSessionStorage();
    await this.getUser();
    this.getCurrentProgress();
  }

  checkSessionStorage() {
    const userToken = sessionStorage.getItem('authToken');
    if (userToken) {
      this.currentUserId = userToken;
      console.log('Token found in sessionStorage:', userToken);
    } else {
      console.log('No token found in sessionStorage.');
      this.router.navigate(['/login']);
    }
  }

  getCurrentProgress() {
    this.dbService.getUser(this.currentUserId).subscribe({
      next: (data) => {
        console.log(data.score)
        this.progress = Math.floor(data.score/500 * 100); // Assuming 'progress' is the field you need
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });
  }

  async getUser() {
    try {
      const user = await this.dbService
        .getUser(this.currentUserId)
        .toPromise();
      this.user = user;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
}
