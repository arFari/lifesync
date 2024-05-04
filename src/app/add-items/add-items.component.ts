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
    user_id: "66354042e45dbbb4e19f0bab", 
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

  addItem(){
    console.log(this.EventData)
    this.databaseService.addItems(this.EventData).subscribe((result: any) => {
      this.router.navigate(['']);
    },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.error("404", error);
        } else {
          console.error(error);
        }
      });
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

