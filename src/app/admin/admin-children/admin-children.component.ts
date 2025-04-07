import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-children',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-children.component.html',
  styleUrls: ['./admin-children.component.css']
})
export class AdminChildrenComponent implements OnInit {
  children: any[] = [];

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadChildren();
  }

  loadChildren() {
    this.adminService.getChildren().subscribe({
      next: (res: any) => {
        this.children = res.data;
      },
      error: () => {
        this.toastr.error('Nem sikerült betölteni a gyermekeket.');
      }
    });
  }

  deleteChild(id: number) {
    if (confirm('Biztosan törlöd ezt a gyermeket?')) {
      this.adminService.deleteChild(id).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message || 'Gyermek törölve.');
          this.loadChildren();
        },
        error: () => {
          this.toastr.error('Hiba történt a törlés közben.');
        }
      });
    }
  }
}
