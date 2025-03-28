import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-child-play',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './child-play.component.html',
  styleUrl: './child-play.component.css'
})
export class ChildPlayComponent implements OnInit {
  games: any[] = [];
  currentGameIndex = 0;
  timer: number = 60 * 60; // 1 óra
  intervalId: any;

  constructor(private route: ActivatedRoute, private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    const childId = Number(this.route.snapshot.queryParamMap.get('childId'));

    if (!childId) {
      this.router.navigate(['/home-private']);
      return;
    }

    this.gameService.getGamesForChild(childId).subscribe({
      next: (res:any) => {
        this.games = res.data;
        this.startTimer();
      },
      error: (err) => console.error('Nem sikerült betölteni a játékokat:', err)
    });
  }

  get currentGame() {
    return this.games[this.currentGameIndex];
  }

  nextGame() {
    if (this.currentGameIndex < this.games.length - 1) this.currentGameIndex++;
  }

  previousGame() {
    if (this.currentGameIndex > 0) this.currentGameIndex--;
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.timer > 0) this.timer--;
      else this.router.navigate(['/home-private']);
    }, 1000);
  }

  formatTime(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  goBack() {
    clearInterval(this.intervalId);
    this.router.navigate(['/home-private']);
  }
}
