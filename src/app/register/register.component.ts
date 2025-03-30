import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  errorMessages: any = {};

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService
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
        next: (res) => {
          this.toastr.success('Sikeres regisztráció! Most bejelentkezhetsz.');
          this.errorMessages = {};
          this.form.reset();
        },
        error: (err) => {
          // A Laravel hibák a "error" kulcsban vannak
          if (err.status === 422 && err.error?.error) {
            this.errorMessages = err.error.error;  // 🔥 EDDIG OK
            this.toastr.error('Hibás adatbevitel. Kérlek ellenőrizd a mezőket.');
          } else {
            this.toastr.error('Ismeretlen hiba történt a regisztráció során.');
            console.error('Ismeretlen hiba:', err);
          }
        }
      });
    }
  }
}
