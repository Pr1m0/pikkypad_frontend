import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get(`${this.apiUrl}/games`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  assignGameToChild(childId: number, gameId: number) {
    return this.http.post(`${this.apiUrl}/children/${childId}/games`, 
      { game_id: gameId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
  }

  saveGameStat(childId: number, gameId: number, duration: number) {
    return this.http.post(`${this.apiUrl}/statistics`, 
      {
        child_id: childId,
        game_id: gameId,
        duration: duration
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
  }
  getGamesForChild(childId: number) {
    return this.http.get(`${this.apiUrl}/children/${childId}/games`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  removeGameFromChild(childId: number, gameId: number) {
    return this.http.delete(`${this.apiUrl}/children/${childId}/games/${gameId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  addGame(data: any) {
    return this.http.post(`${this.apiUrl}/games`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
  
  updateGame(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/games/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
  
  deleteGame(id: number) {
    return this.http.delete(`${this.apiUrl}/games/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
  
}
