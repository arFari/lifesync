import { Component } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';

interface IItem {
  name: string;
  priority: string;
  date: Date;
  duration: Number;
  points: Number;
  reminder: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private dbService: DatabaseService, private router: Router) {}

  item: IItem = {
    name: 'string',
    priority: 'string',
    date: new Date(),
    duration: 2,
    points: 2,
    reminder: true,
  };
  items: IItem[] = [];
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

  ngOnInit() {
    this.getItems();
    console.log(this.items);
  }

  getItems() {
    this.dbService.getItems().subscribe((item: any) => {
      console.log('items: ' + item);
      this.items = item;
    });
  }

  isItemInTimeSlot(item: IItem, day: string, hour: string): boolean {
    const itemDate = new Date(item.date);
    const itemDay = this.days[itemDate.getDay()];
    const itemHour = itemDate.getHours().toString().padStart(2, '0') + ':00';

    console.log(itemDate, itemDay, itemHour);
    return itemDay === day && itemHour === hour;
  }
}
