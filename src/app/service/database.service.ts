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

  // In DatabaseService
  updateTimeSpent(
    userId: string,
    timeSpent: { category: string; hours: number }[]
  ): Observable<any> {
    const body = { time_spent: timeSpent };
    return this.http.put(
      `/api/user/update-time`,
      { id: userId, ...body },
      httpOptions
    );
  }

  getItems() {
    return this.http.get('/api/schedule-item/list');
  }
  addItems(data: any) {
    return this.http.post<any>('/api/schedule-item/add', data);
  }
  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`api/user?id=${userId}`);
  }
}
