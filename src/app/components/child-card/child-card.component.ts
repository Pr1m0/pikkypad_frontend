import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-card.component.html',
  styleUrl: './child-card.component.css'
})
export class ChildCardComponent {
  @Input() child: any;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();
}
