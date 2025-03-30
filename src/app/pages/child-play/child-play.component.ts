import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { MemoryGameComponent } from '../../games/memory-game/memory-game.component';
import { ColoringGameComponent } from '../../games/coloring-game/coloring-game.component';
import { PuzzleGameComponent } from '../../games/puzzle-game/puzzle-game.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-child-play',
  standalone: true,
  imports: [CommonModule, MemoryGameComponent, ColoringGameComponent, PuzzleGameComponent],
  templateUrl: './child-play.component.html',
  styleUrl: './child-play.component.css'
})
export class ChildPlayComponent implements OnInit {
  games: any[] = [];
  currentGameIndex = 0;
  timer: number = 60 * 60;
  intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const childId = Number(this.route.snapshot.queryParamMap.get('childId'));
    if (!childId) {
      this.router.navigate(['/home-private']);
      return;
    }

    this.gameService.getGamesForChild(childId).subscribe({
      next: (res: any) => {
        this.games = res.data;
        if (!this.games.length) {
          this.toastr.info('Nincs játék hozzárendelve a gyermekhez.');
        } else {
          this.startTimer();
          console.log('Lekért játékok:', this.games);
        }
      },
      error: (err) => {
        console.error('Nem sikerült betölteni a játékokat:', err);
        this.toastr.error('Nem sikerült betölteni a játékokat.');
      }
    });
  }

  get currentGame() {
    return this.games[this.currentGameIndex];
  }

  isMemoryGame() {
    return this.currentGame?.title === 'Memória játék';
  }

  isColoringGame() {
    return this.currentGame?.title === 'Színező játék';
  }

  isPuzzleGame() {
    return this.currentGame?.title === 'Puzzle játék';
  }

  nextGame() {
    if (this.currentGameIndex < this.games.length - 1) this.currentGameIndex++;
  }

  previousGame() {
    if (this.currentGameIndex > 0) this.currentGameIndex--;
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.intervalId);
        this.toastr.info('Lejárt az idő!');
        this.router.navigate(['/home-private']);
      }
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
