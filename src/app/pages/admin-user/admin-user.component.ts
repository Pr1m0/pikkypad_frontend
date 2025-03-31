import { Component, NgModule, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
  standalone: true,
  imports: [CommonModule,]
})
export class AdminUserComponent implements OnInit {
  users: any[] = [];

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.users = res.data;
        } else {
          this.toastr.error(res.message);
        }
      },
      error: () => {
        this.toastr.error('Hiba történt a felhasználók betöltése során!');
      }
    });
  }

  deleteUser(id: number) {
    if (confirm('Biztos törölni akarod ezt a felhasználót?')) {
      this.adminService.deleteUser(id).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.loadUsers();
          } else {
            this.toastr.error(res.message);
          }
        },
        error: () => {
          this.toastr.error('Hiba történt a felhasználó törlése során!');
        }
      });
    }
  }

  promoteUser(id: number) {
    if (confirm('Biztos adminná akarod léptetni ezt a felhasználót?')) {
      this.adminService.promoteUser(id).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.loadUsers();
          } else {
            this.toastr.error(res.message);
          }
        },
        error: () => {
          this.toastr.error('Hiba történt az adminná léptetés során!');
        }
      });
    }
  }
}
