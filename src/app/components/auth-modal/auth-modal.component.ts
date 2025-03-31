import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../../register/register.component';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RegisterComponent],
  templateUrl: './auth-modal.component.html'
})
export class AuthModalComponent {
  loginForm: FormGroup;
  activeTab: 'login' | 'register' = 'login';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      name: [''],
      password: ['']
    });
  }

  onLogin() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.data.token);

        this.auth.getCurrentUser().subscribe({
          next: (user: any) => {
            this.toastr.success('Sikeres bejelentkezés!');

            if (user.role === 'admin' || user.role === 'superadmin') {
              this.router.navigate(['/admin/users']);
            } else {
              this.router.navigate(['/home-private']);
            }
          },
          error: () => {
            this.toastr.error('Bejelentkezés sikerült, de a navigáció hibás.');
            this.router.navigate(['/home-private']);
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Hibás felhasználónév vagy jelszó!');
      }
    });
  }
}