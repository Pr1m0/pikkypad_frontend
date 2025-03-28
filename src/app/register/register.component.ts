import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth.register(this.form.value).subscribe({
        next: (res) => {
          console.log('Sikeres regisztráció', res);
          this.errorMessages = {}; 
          ;

        },
        error: (err) => {
          if (err.status === 422 && err.error?.error) {
            this.errorMessages = err.error.error; 
          } else {
            console.error('Ismeretlen hiba:', err);
          }
          
        }
      });
    }
  }
}
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {
//   form: FormGroup;

//   constructor(private fb: FormBuilder, private auth: AuthService) {
//     this.form = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.form.valid) {
//       this.auth.register(this.form.value).subscribe({
//         next: (res) => {
//           console.log('Sikeres regisztráció', res);
//           // itt esetleg modal bezárása és visszajelzés
//         },
//         error: (err) => {
//           console.error('Regisztrációs hiba:', err);
//         }
//       });
//     }
//   }
// }