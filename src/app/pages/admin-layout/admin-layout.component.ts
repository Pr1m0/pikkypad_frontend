import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  currentTime: string = '';
  currentDate: string = '';
  userName: string = 'Admin';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
      this.currentDate = now.toLocaleDateString();
    }, 1000);

    const token = localStorage.getItem('token');
    if (token) {
      this.auth.getCurrentUser().subscribe({
        next: (res: any) => {
          this.userName = res?.name || 'Admin';
        },
        error: () => {
          this.userName = 'Admin';
        }
      });
    }
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }
}
