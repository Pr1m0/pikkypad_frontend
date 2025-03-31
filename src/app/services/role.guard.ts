import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.getCurrentUser().subscribe({
        next: (res: any) => {
          if (res.role === 'admin' || res.role === 'superadmin') {
            resolve(true);
          } else {
            this.toastr.error('Nincs jogosultság!');
            this.router.navigate(['/home-private']);
            resolve(false);
          }
        },
        error: () => {
          this.router.navigate(['/']);
          resolve(false);
        }
      });
    });
  }
}
