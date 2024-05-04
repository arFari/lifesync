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
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  hours: string[] = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
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
    '23:00',
  ];

  async ngOnInit() {
    await this.getPreference();
    let tempTime = this.user.time_spent;
    console.log(tempTime);
    let balancedSchedule = this.generateItemsFromTimeSpent(tempTime);
    console.log('schedule: ' + balancedSchedule);
    this.items = balancedSchedule;
  }

  getItems() {
    this.dbService.getItems().subscribe((item: any) => {
      console.log('items: ' + item);
      this.items = item;
    });
  }

  generateItemsFromTimeSpent(timeSpent: { category: string; hours: number }[]) {
    const items: any[] = [];

    // Convert time_spent array to IItem array
    timeSpent.forEach((entry) => {
      console.log(entry);
      let counter = entry.hours;
      for (let i = 0; i < counter; i++) {
        if (i == 7) {
          counter = counter - 7;
          i = 0;
        }
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + i);
        const item: any = {
          category: entry.category,
          priority: this.randomPriority(), // Set default priority
          date: tomorrow,
          hours: entry.hours,
          points: 10, // Set default points
          reminder: true, // Set default reminder
        };
        items.push(item);
      }
    });

    return items;
  }

  randomPriority() {
    let temparr = ['low', 'med', 'high'];
    return temparr[Math.floor(Math.random() * 2)];
  }

  isItemInTimeSlot(item: any, day: string, hour: string): boolean {
    const itemDate = new Date(item.date);
    const itemDay = this.days[itemDate.getDay()];
    const itemHour = itemDate.getHours().toString().padStart(2, '0') + ':00';

    console.log(itemDate, itemDay, itemHour);
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
}
