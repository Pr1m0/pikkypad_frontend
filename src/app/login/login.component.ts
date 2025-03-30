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
          this.toastr.success('Sikeres bejelentkezés!');
          this.router.navigate(['/home-private']);
        },
        error: (err) => {
          console.error('Bejelentkezési hiba:', err);
          this.toastr.error('Hibás email vagy jelszó!');
        }
      });
    } else {
      this.toastr.warning('Kérlek, töltsd ki a mezőket!');
    }
  }
}
