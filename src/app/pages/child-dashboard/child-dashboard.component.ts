import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildService } from '../../services/child.service';

@Component({
  selector: 'app-child-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-dashboard.component.html',
  styleUrl: './child-dashboard.component.css'
})
export class ChildDashboardComponent implements OnInit {
  children: any[] = [];

  constructor(private childService: ChildService) {}

  ngOnInit() {
    this.loadChildren();
  }

  loadChildren() {
    this.childService.getChildren().subscribe({
      next: (res: any) => {
        this.children = res.data;
      },
      error: (err) => {
        console.error('Gyermekek betöltése sikertelen:', err);
      }
    });
  }

  deleteChild(id: number) {
    if (confirm('Biztosan törölni szeretnéd ezt a gyermeket?')) {
      this.childService.deleteChild(id).subscribe({
        next: () => this.loadChildren(),
        error: (err) => console.error('Törlés sikertelen:', err)
      });
    }
  }
}
