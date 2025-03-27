import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-card',
  standalone: true,
  templateUrl: './child-card.component.html',
  styleUrl: './child-card.component.css'
})
export class ChildCardComponent {
  @Input() child: any; // vagy Child, ha van típusod
}
