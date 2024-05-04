import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-create-time',
  templateUrl: './create-time.component.html',
  styleUrls: ['./create-time.component.css'],
})
export class CreateTimeComponent {
  selectedCategories = new Set<string>();
  currentState = 'selecting';
  timeSpent: { [category: string]: { hours: number } } = {};
  categories = [
    {
      key: 'healthAndFitness',
      name: 'Health and Fitness',
      icon: 'assets/icon/hf.svg',
    },
    { key: 'studying', name: 'Studying', icon: 'assets/icon/study.svg' },
    { key: 'hygiene', name: 'Hygiene', icon: 'assets/icon/hygiene.svg' },
    { key: 'eating', name: 'Eating', icon: 'assets/icon/eat.svg' },
    { key: 'socialising', name: 'Socialising', icon: 'assets/icon/social.svg' },
    { key: 'working', name: 'Working', icon: 'assets/icon/work.svg' },
  ];
  fixedUserId = '66354042e45dbbb4e19f0bab'; // Removed 'string' type declaration as it is redundant

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  toggleSelection(categoryKey: string): void {
    if (this.selectedCategories.has(categoryKey)) {
      this.selectedCategories.delete(categoryKey);
    } else {
      this.selectedCategories.add(categoryKey);
    }
  }

  goToQuestions(): void {
    if (this.selectedCategories.size > 0) {
      console.log('Selected categories:', Array.from(this.selectedCategories));
      const categoryArray = Array.from(this.selectedCategories).join(',');

      // Ensure every selected category has an initialized 'timeSpent' entry
      this.selectedCategories.forEach((categoryKey) => {
        if (!this.timeSpent[categoryKey]) {
          this.timeSpent[categoryKey] = { hours: 0 };
        }
      });

      // Update categories in the database
      this.databaseService
        .updateCategories(this.fixedUserId, categoryArray)
        .subscribe(
          (response) => {
            console.log('Updated categories:', categoryArray);
            console.log('Response from server:', response);
            this.currentState = 'questioning'; // Change state only after successful update
          },
          (error) => {
            console.error('Error updating categories:', error);
          }
        );
    } else {
      alert('Please select at least one category before proceeding.');
    }
  }

  setHours(categoryKey: string, hours: number): void {
    if (this.timeSpent[categoryKey]) {
      this.timeSpent[categoryKey].hours = hours;
    } else {
      console.error(
        'Attempted to set hours for a category not initialized or selected.'
      );
    }
  }

  completeQuestions(): void {
    this.currentState = 'completed'; // Update the component state

    // Prepare the timeSpent data for submission
    const timeSpentData = Array.from(this.selectedCategories).map(
      (categoryKey) => ({
        category: categoryKey,
        hours: this.timeSpent[categoryKey]?.hours || 0, // Safeguard with '|| 0' to handle undefined
      })
    );

    console.log('Submission Data:', timeSpentData);

    // Send the data to the server
    this.databaseService
      .updateTimeSpent(this.fixedUserId, timeSpentData, this.startTime)
      .subscribe(
        (response) => {
          console.log('Time spent updated successfully.', response);
          // Optionally handle navigation or additional logic here after successful update
        },
        (error) => {
          console.error('Failed to update time spent.', error);
          // Handle errors, potentially notifying the user
        }
      );

    this.router.navigate(['/schedule-confirmation']);
  }
  // Inside your component class
  startTime: number = 8; // Default start time

  setStartTime(value: number) {
    this.startTime = value;
    console.log(this.startTime);
  }
}
