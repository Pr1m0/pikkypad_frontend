import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Játékok lekérdezése
  getGames() {
    return this.http.get(`${this.apiUrl}/games`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  // Játék hozzárendelése gyermekhez
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

  // Statisztika mentése játékhoz
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
}
