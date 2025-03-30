import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth-modal.component.html'
})
export class AuthModalComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
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

    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  onLogin() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.data.token);
        this.toastr.success('Sikeres bejelentkezés!');
        document.getElementById('authModal')?.classList.remove('show');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Hibás felhasználónév vagy jelszó!');
      }
    });
  }

  onRegister() {
    this.auth.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Sikeres regisztráció! Most bejelentkezhetsz.');
        this.activeTab = 'login';
        this.registerForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('A regisztráció sikertelen. Próbáld újra!');
      }
    });
  }
}
