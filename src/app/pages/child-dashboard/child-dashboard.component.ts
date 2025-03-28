import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChildService } from '../../services/child.service';
import { GameService } from '../../services/game.service';
import { ChildCardComponent } from '../../components/child-card/child-card.component';

@Component({
  selector: 'app-child-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ChildCardComponent],
  templateUrl: './child-dashboard.component.html',
  styleUrl: './child-dashboard.component.css'
})
export class ChildDashboardComponent implements OnInit {
  children: any[] = [];
  games: any[] = [];
  childForm!: FormGroup;
  editId: number | null = null;

  selectedChildForGame: { [gameId: number]: number | null } = {}; // minden játékhoz egy gyermek

  constructor(
    private fb: FormBuilder,
    private childService: ChildService,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.childForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(3), Validators.max(9)]]
    });

    this.loadChildren();
    this.loadGames();
  }

  loadChildren() {
    this.childService.getChildren().subscribe({
      next: (res: any) => this.children = res.data,
      error: (err) => console.error('Hiba a gyermekek lekérdezésekor:', err)
    });
  }

  loadGames() {
    this.gameService.getGames().subscribe({
      next: (res: any) => this.games = res.data,
      error: (err) => console.error('Hiba a játékok betöltésekor:', err)
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
        },
        error: (err) => console.error('Frissítés sikertelen:', err)
      });
    } else {
      this.childService.addChild(this.childForm.value).subscribe({
        next: () => {
          this.loadChildren();
          this.childForm.reset();
        },
        error: (err) => console.error('Hozzáadás sikertelen:', err)
      });
    }
  }

  deleteChild(id: number) {
    if (confirm('Biztosan törlöd?')) {
      this.childService.deleteChild(id).subscribe({
        next: () => this.loadChildren(),
        error: (err) => console.error('Törlés sikertelen:', err)
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
          alert('Játék sikeresen hozzárendelve a gyermekhez!');
          this.selectedChildForGame[gameId] = null;
        },
        error: (err) => console.error('Hozzárendelés sikertelen:', err)
      });
    } else {
      alert('Kérlek válassz ki egy gyermeket!');
    }
  }
}
