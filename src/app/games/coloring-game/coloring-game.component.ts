import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-coloring-game',
  standalone: true,
  templateUrl: './coloring-game.component.html',
  styleUrls: ['./coloring-game.component.css'],
  imports:[NgFor,NgStyle]
})
export class ColoringGameComponent {
  colors: string[] = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFC0CB', '#000000'];
  selectedColor: string = '#FF0000';
  selectedColors: { [key: string]: string } = {};

  onColorClick(pathId: string): void {
    this.selectedColors[pathId] = this.selectedColor;
  }
  restartGame(): void {
    this.selectedColors = {};
  }
}
