import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/user.model';
import {Observable} from 'rxjs/index';
import {ApiResponse} from '../model/api.response';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:44328/api/user-portal/users';

  login(loginPayload: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/login', loginPayload);
  }
  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  confirmUserEmail(userId: string, code: string) {
    return this.http.put(this.baseUrl + '/confirmemail/' + userId, {code});
  }
}
