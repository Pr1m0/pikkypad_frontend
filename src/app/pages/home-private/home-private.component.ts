import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { ChildService } from '../../services/child.service';
import { HttpClient } from '@angular/common/http';
import { ChildCardComponent } from '../../components/child-card/child-card.component';
import { ChildDashboardComponent } from '../child-dashboard/child-dashboard.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-private',
  standalone: true,
  imports: [CommonModule, RouterModule, ChildCardComponent, ChildDashboardComponent],
  templateUrl: './home-private.component.html',
  styleUrl: './home-private.component.css'
})
export class HomePrivateComponent implements OnInit {
  parentName = '';
  children: any[] = [];

  constructor(
    private childService: ChildService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchChildren();
  }

  fetchChildren() {
    this.childService.getChildren().subscribe({
      next: (res: any) => {
        this.children = res.data;
        if (res.data.length > 0 && res.data[0].user?.name) {
          this.parentName = res.data[0].user.name;
        } else {
          this.parentName = 'Szülő';
        }
      },
      error: (err) => {
        console.error('Gyermekek betöltése sikertelen:', err);
        this.toastr.error('Hiba történt a gyermekek lekérdezésekor.');
      }
    });
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

  goToChildDashboard() {
    this.router.navigate(['/child-dashboard']);
  }
}
