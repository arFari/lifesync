import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-create-time',
  templateUrl: './create-time.component.html',
  styleUrls: ['./create-time.component.css']
})
export class CreateTimeComponent {
  constructor(private databaseService: DatabaseService, private router: Router) { }
  selectedCategories = new Set<string>();
  currentState = 'selecting';
  timeSpent: { [category: string]: { hours: number} } = {};
  categories = [
    { key: 'healthAndFitness', name: 'Health and Fitness', icon: 'assets/icon/hf.svg' },
    { key: 'studying', name: 'Studying', icon: 'assets/icon/study.svg' },
    { key: 'hygiene', name: 'Hygiene', icon: 'assets/icon/hygiene.svg' },
    { key: 'eating', name: 'Eating', icon: 'assets/icon/eat.svg' },
    { key: 'socialising', name: 'Socialising', icon: 'assets/icon/social.svg' },
    { key: 'working', name: 'Working', icon: 'assets/icon/work.svg' }
  ];

  toggleSelection(category: string): void {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
  }

  goToQuestions(): void {
    if (this.selectedCategories.size > 0) {
      this.currentState = 'questioning';
  
      // Initialize timeSpent for each category if not already initialized
      this.selectedCategories.forEach(category => {
        if (!this.timeSpent[category]) {
          this.timeSpent[category] = { hours: 0 };
        }
      });
  
      // Update categories in the database
      console.log(this.selectedCategories)
      const categoryArray = Array.from(this.selectedCategories);
      this.databaseService.updateCategories(categoryArray).subscribe(
        (response: any) => {
          // Log successful updates here
          console.log("Updated categories:", this.selectedCategories);
          console.log("Response from server:", response);
        },
        (error: any) => {
          // Handle errors, if any
          console.error("Error updating categories:", error);
        }
      );
    } else {
      alert("Please select at least one category before proceeding.");
    }
  }
  

  setHours(category: string, hours: number): void {
    if (this.timeSpent[category]) {
      this.timeSpent[category].hours = hours;
    }
  }

  completeQuestions(): void {
    this.currentState = 'completed'; // Move to the next part of your application logic
    console.log('Submission Data:', this.timeSpent);
  }
}
