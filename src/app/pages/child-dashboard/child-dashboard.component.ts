import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChildService } from '../../services/child.service';
import { GameService } from '../../services/game.service';
import { ChildCardComponent } from '../../components/child-card/child-card.component';
import { ToastrService } from 'ngx-toastr';
import { RouterModule,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-child-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule, ReactiveFormsModule, FormsModule, ChildCardComponent],
  templateUrl: './child-dashboard.component.html',
  styleUrl: './child-dashboard.component.css'
})
export class ChildDashboardComponent implements OnInit {
  children: any[] = [];
  games: any[] = [];
  childForm!: FormGroup;
  editId: number | null = null;

  selectedChildForGame: { [gameId: number]: number | null } = {};

  constructor(
    private fb: FormBuilder,
    private childService: ChildService,
    private gameService: GameService,
    private toastr: ToastrService,
    private http: HttpClient, 
    private router: Router   
  ) {}

  ngOnInit() {
    this.childForm = this.fb.group({
      name: ['', [Validators.required,Validators.pattern(/^[\p{L}\s]+$/u)]],
      age: ['', [Validators.required, Validators.min(3), Validators.max(9)]]
    });

    this.loadChildren();
    this.loadGames();
  }

  loadChildren() {
    this.childService.getChildren().subscribe({
      next: (res: any) => this.children = res.data,
      error: () => this.toastr.error('Nem sikerült betölteni a gyermekeket.')
    });
  }

  loadGames() {
    this.gameService.getGames().subscribe({
      next: (res: any) => {
        this.games = res.data;
        this.games.forEach(game => {
          this.selectedChildForGame[game.id] = null;
        });
      },
      error: () => this.toastr.error('Nem sikerült betölteni a játékokat.')
    });
  }

  onSubmit() {
    if (this.childForm.invalid) return;

    if (this.editId) {
      this.childService.updateChild(this.editId, this.childForm.value).subscribe({
        next: () => {
          this.loadChildren();
          this.childForm.reset();
          this.editId = null;
          this.toastr.success('Gyermek sikeresen frissítve!');
        },
        error: () => this.toastr.error('Frissítés sikertelen.')
      });
    } else {
      this.childService.addChild(this.childForm.value).subscribe({
        next: () => {
          this.loadChildren();
          this.childForm.reset();
          this.toastr.success('Gyermek sikeresen hozzáadva!');
        },
        error: () => this.toastr.error('Hozzáadás sikertelen.')
      });
    }
  }

  deleteChild(id: number) {
    if (confirm('Biztosan törlöd?')) {
      this.childService.deleteChild(id).subscribe({
        next: () => {
          this.loadChildren();
          this.toastr.success('Gyermek törölve.');
        },
        error: () => this.toastr.error('Törlés sikertelen.')
      });
    }
  }

  editChild(child: any) {
    this.editId = child.id;
    this.childForm.patchValue({
      name: child.name,
      age: child.age
    });
  }

  assignGameToChild(gameId: number, childId: number | null) {
    if (childId) {
      this.gameService.assignGameToChild(childId, gameId).subscribe({
        next: () => {
          this.toastr.success('Játék sikeresen hozzárendelve!');
          this.selectedChildForGame[gameId] = null;
          this.loadChildren();
        },
        error: () => this.toastr.error('Hozzárendelés sikertelen.')
      });
    } else {
      this.toastr.warning('Kérlek válassz ki egy gyermeket!');
    }
  }

  removeGameFromChild(data: { childId: number; gameId: number }) {
    if (confirm('Biztosan törlöd a játékot a gyermektől?')) {
      this.gameService.removeGameFromChild(data.childId, data.gameId).subscribe({
        next: () => {
          this.loadChildren();
          this.toastr.success('Játék eltávolítva.');
        },
        error: () => this.toastr.error('Hiba történt a törlés közben.')
      });
    }
  }
  logout() {
    this.http.post('http://localhost:8000/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
        this.toastr.success('Sikeres kijelentkezés!');
      },
      error: () => {
        this.toastr.error('Hiba történt kijelentkezés közben.');
      }
    });
  }
}
