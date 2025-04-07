import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-game.component.html',
  styleUrls: ['./admin-game.component.css']
})
export class AdminGameComponent implements OnInit {
  games: any[] = [];
  gameForm!: FormGroup;
  editId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required]
    });

    this.loadGames();
  }

  loadGames() {
    this.gameService.getGames().subscribe({
      next: (res: any) => this.games = res.data,
      error: () => this.toastr.error('Nem sikerült betölteni a játékokat.')
    });
  }

  onSubmit() {
    if (this.gameForm.invalid) return;

    if (this.editId) {
      this.gameService.updateGame(this.editId, this.gameForm.value).subscribe({
        next: () => {
          this.toastr.success('Játék frissítve!');
          this.loadGames();
          this.resetForm();
        },
        error: () => this.toastr.error('Hiba a frissítés során.')
      });
    } else {
      this.gameService.addGame(this.gameForm.value).subscribe({
        next: () => {
          this.toastr.success('Játék hozzáadva!');
          this.loadGames();
          this.resetForm();
        },
        error: () => this.toastr.error('Hiba a mentés során.')
      });
    }
  }

  editGame(game: any) {
    this.editId = game.id;
    this.gameForm.patchValue(game);
  }

  deleteGame(id: number) {
    if (confirm('Biztosan törlöd ezt a játékot?')) {
      this.gameService.deleteGame(id).subscribe({
        next: () => {
          this.toastr.success('Játék törölve!');
          this.loadGames();
        },
        error: () => this.toastr.error('Hiba a törlés során.')
      });
    }
  }

  resetForm() {
    this.gameForm.reset();
    this.editId = null;
  }
}
