import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  updateCategories(userId: string, categories: string): Observable<any> {
    const body = {
      id: userId, // Ensure the backend expects 'id' not 'userId'
      categories: categories,
    };
    return this.http.put(`/api/user/update`, body, httpOptions);
  }

  updateItem(data: any) {
    console.log(data);
    return this.http.put<any>('/api/schedule-item/update', data, httpOptions);
  }

  // In DatabaseService
  updateTimeSpent(
    userId: string,
    timeSpent: { category: string; hours: number }[],
    startTime: number
  ): Observable<any> {
    const body = { time_spent: timeSpent, startTime: startTime };
    return this.http.put(
      `/api/user/update-time`,
      { id: userId, ...body },
      httpOptions
    );
  }
  getTodayTasks(userId: string) {
    return this.http.get<any>(`/api/schedule-item/dayTracker/${userId}`);
  }
  getItems() {
    return this.http.get('/api/schedule-item/list');
  }

  deleteItem(data: String) {
    return this.http.delete("/api/schedule-item/delete/" +data);
  }
  getUndoneItems() {
    return this.http.get('/api/schedule-item/list/not-done');
  }
  addItems(data: any) {
    return this.http.post<any>('/api/schedule-item/add', data, httpOptions);
  }
  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`api/user?id=${userId}`);
  }
  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`/api/schedule-item/id/${userId}`);
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      'api/user/login',
      { username, password },
      httpOptions
    );
  }
  register(username: string, password: string, name: string): Observable<any> {
    return this.http.post<any>(
      'api/user/register',
      { username, password, name },
      httpOptions
    );
  }
  addScore(data: any) {
    console.log(data);
    return this.http.put<any>('/api/user/add-score', data, httpOptions);
  }
  updateReward(data: any) {
    return this.http.put(`/api/user/update-reward`, data, httpOptions);
  }
  addCollectible(data: any) {
    return this.http.put(`/api/user/add-collectible`, data, httpOptions);
  }
}
