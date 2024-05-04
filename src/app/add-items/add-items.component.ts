import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent {
  EventData = {
    name: "",
    priority: 1, 
    date: new Date(),
    user_id: "", 
    points: 10,
    reminder: false,
    categories: '',
    duration: 0
  };
  categories = [
    { key: 'healthAndFitness', name: 'Health and Fitness', icon: 'assets/icon/hf.svg' },
    { key: 'studying', name: 'Studying', icon: 'assets/icon/study.svg' },
    { key: 'hygiene', name: 'Hygiene', icon: 'assets/icon/hygiene.svg' },
    { key: 'eating', name: 'Eating', icon: 'assets/icon/eat.svg' },
    { key: 'socialising', name: 'Socialising', icon: 'assets/icon/social.svg' },
    { key: 'working', name: 'Working', icon: 'assets/icon/work.svg' }
  ];
  
  constructor(private databaseService: DatabaseService, private router: Router) { }
  ngOnInit() {
    this.checkSessionStorage();
  }
  checkSessionStorage() {
    const userToken = sessionStorage.getItem('authToken');
    if (userToken) {
      this.EventData.user_id = userToken;
      console.log('Token found in sessionStorage:', userToken);
    } else {
      console.log('No token found in sessionStorage.');
      this.router.navigate(['/login']);
    }
  }

  addItem() {
    let currentTime = new Date(this.EventData.date); 
    let durationHours = this.EventData.duration
  
    const endTime = new Date(currentTime.getTime() + durationHours * 60 * 60 * 1000);
  
    const scheduleEvent = (eventTime: any) => {
      this.EventData.date = eventTime.toISOString(); 
      this.databaseService.addItems(this.EventData).subscribe(
        (result: any) => {
          console.log(`Event scheduled at ${eventTime.toISOString()} added successfully`, result);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.error("400 Bad Request", error);
          } else {
            console.error(error);
          }
        }
      );
    };
  
    while (currentTime < endTime) {
      scheduleEvent(currentTime);
      currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
    }
  
    // Navigate after all events are scheduled
    this.router.navigate(['']);
  }
  
  generateRandomPoints() {
    this.EventData.points = Math.floor(Math.random() * 91) + 10;
  }

  submitForm() {
    this.generateRandomPoints();
    this.addItem();
  }
  selectCategory(category: string) {
    this.EventData.categories = category;
  }
}

