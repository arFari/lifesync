import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
import {Modal} from 'bootstrap'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('modal')
  modalElement!: ElementRef;
  constructor(private dbService: DatabaseService, private router: Router) {}

  item: any;
  items: any[] = [];
  timeSpent: any = { category: '', hours: 0 };
  currentDayIndex: number = 0;
  currentTimeIndex: number = 0;
  currentUserId: string = '';
  progress: number = 0;
  todayTasks: any[] = [];
  score= 0;
  gifted = false;
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

  ngAfterViewInit() {
    this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.getCurrentProgress();
      console.log('Modal hidden event fired');
    });
  }

  async ngOnInit() {
    this.checkSessionStorage();
    this.getItems();
    this.getCurrentProgress();
    this.getTodayTasks();
    this.getPreference();
    this.gifted = false;
    this.currentDayIndex = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
    this.currentTimeIndex = new Date().getHours(); // 0 to 23 for hours
  }

  ngOnChanges() {
    this.getItems();
    this.getCurrentProgress();
    this.getTodayTasks();
    this.getPreference();
    this.gifted = false;
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

  show(modalElement: Element){
    const modal=new Modal(modalElement);
    this.claimReward();
    modal.show();
  }

  onModalHidden() {
    this.getCurrentProgress();
    console.log("masuk func");
  }

  getItems() {
    console.log(this.currentUserId);
    this.dbService.getUserById(this.currentUserId).subscribe((item: any) => {
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
      const user = await this.dbService.getUser(this.currentUserId).toPromise();
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

  getCurrentProgress() {
    this.dbService.getUser(this.currentUserId).subscribe({
      next: (data) => {
        console.log(data.score)
        this.score = data.score
        this.progress = Math.floor(data.score/500 * 100); // Assuming 'progress' is the field you need
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });
  }

  getTodayTasks() {
    this.dbService.getTodayTasks(this.currentUserId).subscribe((item: any) => {
      console.log(item);
      this.todayTasks = item;
    });
  }

  claimReward() {
    console.log('Reward Claim');
    
    //Add collectibles to user collection
    let res = this.dbService
    .addScore({
      id: this.currentUserId,
      score: -500,
    })
    .subscribe(
      () => {
        console.log('points deducted');
        this.getCurrentProgress;
        console.log(this.progress)
      },
      (error) => {
        console.log(error);
        if (error.status === 400) {
        }
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
  }

  onCheckboxChange(task: any): void {
    console.log(task.id);
    let res = this.dbService
      .addScore({
        id: this.currentUserId,
        score: task.points,
      })
      .subscribe(
        () => {
          this.getCurrentProgress();
          console.log('yesyesyeys');
        },
        (error) => {
          console.log(error);
          if (error.status === 400) {
          }
        }
      );
    let res2 = this.dbService
      .updateItem({
        id: task.id,
        done: true,
      })
      .subscribe(
        () => {
          console.log('yesyesyeys');
        },
        (error) => {
          console.log(error);
          if (error.status === 400) {
          }
        }
      );
      this.score = this.score + task.points
    console.log();
    this.todayTasks = this.todayTasks.filter((item) => item.id !== task.id);
  }
  sendReminder() {}
}
