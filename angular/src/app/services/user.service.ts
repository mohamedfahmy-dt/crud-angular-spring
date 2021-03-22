import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/users'
  // private baseUrl = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUserById/${id}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/createUser`, user);
  }


  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/updateUser/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`, { responseType: 'text' });
  }

  getUserList() {
    return this.http.get<User[]>(`${this.baseUrl}/getAllUsers`);
  }

  getAllUsers() {
    return this.http.get(`${this.baseUrl}/getAllUsers`);
  }




}
