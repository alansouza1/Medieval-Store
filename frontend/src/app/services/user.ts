import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  classe: string;
  level: number;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, user);
  }

  login(credentials: Partial<User>): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:3000/login', credentials);
  }
}
