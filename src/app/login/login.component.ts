import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
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
            error: (err) => {
              console.error('Nem sikerült lekérni a felhasználót:', err);
              this.toastr.error('Bejelentkezés sikerült, de a jogosultsági adatok lekérése hibás.');
              this.router.navigate(['/home-private']);
            }
          });
        },
        error: (err) => {
          console.error('Bejelentkezési hiba:', err);
  
          if (err.status === 401 && err.error?.errorMessage) {
            this.toastr.error(err.error.errorMessage);
          } else if (err.status === 422 && err.error?.error) {
            this.toastr.warning('Hibás adatbevitel! Kérlek, ellenőrizd az űrlapot.');
          } else {
            this.toastr.error('Hibás email vagy jelszó!');
          }
        }
      });
    } else {
      this.toastr.warning('Kérlek, töltsd ki a mezőket!');
    }
  }
}