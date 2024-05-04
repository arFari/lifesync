import { Component } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private dbService: DatabaseService, private router: Router) {}

  item: any;
  items: any[] = [];
  timeSpent: any = { category: '', hours: 0 };
  currentDayIndex: number = 0;
  currentTimeIndex: number = 0;

  user: any = {
    _id: 'sample_id',
    username: 'sample_username',
    password: 'sample_password',
    name: 'Sample User',
    categories: [],
    time_spent: [],
    score: 100,
  };
  days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  hours: string[] = [
    '05:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];

  async ngOnInit() {
    this.getItems();

    this.currentDayIndex = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
    this.currentTimeIndex = new Date().getHours(); // 0 to 23 for hours
  }

  getItems() {
    this.dbService.getItems().subscribe((item: any) => {
      console.log(item);
      this.items = item;
    });
  }

  randomPriority() {
    let temparr = ['low', 'med', 'high'];
    return temparr[Math.floor(Math.random() * 2)];
  }

  isItemInTimeSlot(item: any, day: string, hour: string): boolean {
    const itemDate = new Date(item.date);
    const itemDay = this.days[itemDate.getDay()];
    const itemHour = itemDate.getHours().toString().padStart(2, '0') + ':00';

    return itemDay === day && itemHour === hour;
  }

  async getPreference() {
    try {
      const user = await this.dbService
        .getUser('66354042e45dbbb4e19f0bab')
        .toPromise();
      this.user = user;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  getCurrentHour(): string {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':00';
  }

  taskToday() {
    this.items.filter((item: any) => {
      const itemDate = new Date(item.date);
      return itemDate.toDateString() === new Date().toDateString();
    });
  }

  sendReminder() {}
}
