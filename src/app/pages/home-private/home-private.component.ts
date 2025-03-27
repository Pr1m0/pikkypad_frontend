import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ChildService } from '../../services/child.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-private',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-private.component.html',
  styleUrl: './home-private.component.css'
})
export class HomePrivateComponent implements OnInit {
  parentName = '';
  children: any[] = [];

  constructor(private childService: ChildService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchChildren();
  }

  fetchChildren() {
    this.childService.getChildren().subscribe({
      next: (res: any) => {
        this.children = res.data;
        if (res.data.length > 0) {
          this.parentName = res.data[0].user.name; // 👈 ha backend küldi a szülő nevét is
        }
      },
      error: (err) => {
        console.error('Gyermekek betöltése sikertelen:', err);
      }
    });
  }

  logout() {
    this.http.post('http://localhost:8000/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    });
  }

  goToChildDashboard() {
    this.router.navigate(['/child-dashboard']);
  }
}
