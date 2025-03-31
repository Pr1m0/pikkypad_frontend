import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private apiUrl = 'http://localhost:8000/api/children';

  constructor(private http: HttpClient) {}

  getChildren() {
    return this.http.get(this.apiUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  addChild(data: any) {
    return this.http.post(this.apiUrl, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  updateChild(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  deleteChild(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
  

