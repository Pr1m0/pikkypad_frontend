import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-games.component.html',
  styleUrl: './child-games.component.css'
})
export class ChildGamesComponent implements OnInit {
  childId!: number;
  games: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.childId = +this.route.snapshot.paramMap.get('childId')!;
    this.loadGamesForChild();
  }

  loadGamesForChild() {
    this.gameService.getGamesForChild(this.childId).subscribe({
      next: (res: any) => {
        this.games = res.data;
      },
      error: (err) => {
        console.error('Játékok betöltése sikertelen:', err);
      }
    });
  }

  startGame(gameId: number) {
    this.router.navigate(['/child-play'], {
      queryParams: {
        childId: this.childId,
        gameId: gameId
      }
    });
  }
}
