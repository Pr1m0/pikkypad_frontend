import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChildService } from '../../services/child.service';
import { ChildCardComponent } from '../../components/child-card/child-card.component';

@Component({
  selector: 'app-child-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ChildCardComponent],
  templateUrl: './child-dashboard.component.html',
  styleUrl: './child-dashboard.component.css'
})
export class ChildDashboardComponent implements OnInit {
  children: any[] = [];
  childForm!: FormGroup;
  editId: number | null = null;

  constructor(private fb: FormBuilder, private childService: ChildService) {}

  ngOnInit() {
    this.childForm = this.fb.group({
      name: [''],
      age: ['']
    });
    this.loadChildren();
  }

  loadChildren() {
    this.childService.getChildren().subscribe({
      next: (res: any) => this.children = res.data,
      error: (err) => console.error('Hiba a gyermekek lekérdezésekor:', err)
    });
  }

  onSubmit() {
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
}
