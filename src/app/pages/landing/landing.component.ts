import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from '../../components/auth-modal/auth-modal.component';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, AuthModalComponent, LoginComponent, RegisterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  showLogin = false;
  showRegister = false;

  openLogin() {
    this.showLogin = true;
    this.showRegister = false;
  }

  openRegister() {
    this.showRegister = true;
    this.showLogin = false;
  }

  closeModals() {
    this.showLogin = false;
    this.showRegister = false;
  }
}
