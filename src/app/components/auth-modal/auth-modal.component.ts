import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
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
        document.getElementById('authModal')?.classList.remove('show');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onRegister() {
    this.auth.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        alert('Sikeres regisztráció! Most bejelentkezhetsz.');
        this.activeTab = 'login';
        this.registerForm.reset();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
