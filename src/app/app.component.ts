import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from "./pages/landing/landing.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template:'<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'pikkypad_frontend';
}

