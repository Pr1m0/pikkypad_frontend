import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() close = new EventEmitter<void>();

  form: FormGroup;
  errorMessages: any = {};

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth.register(this.form.value).subscribe({
        next: () => {
          this.toastr.success('Sikeres regisztráció!');
          this.form.reset();
          this.errorMessages = {};
          this.close.emit();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Regisztrációs hiba:', err);
          if (err.status === 422 && err.error?.error) {
            this.errorMessages = err.error.error;
            this.toastr.error('Hibás adatbevitel. Kérlek ellenőrizd a mezőket.');
          } else {
            this.toastr.error('Ismeretlen hiba történt.');
          }
        }
      });
    }
  }
}
