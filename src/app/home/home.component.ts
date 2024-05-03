import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][] = [];

  constructor() {
    this.generateCalendar();
  }

  generateCalendar() {
    const currentDate = new Date();
    const monthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const monthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const weeks: number[][] = [];
    let week: number[] = [];

    for (let i = 1; i <= monthEnd.getDate(); i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      week.push(i);
      if (date.getDay() === 6 || i === monthEnd.getDate()) {
        weeks.push(week);
        week = [];
      }
    }
    this.weeks = weeks;
  }
}
