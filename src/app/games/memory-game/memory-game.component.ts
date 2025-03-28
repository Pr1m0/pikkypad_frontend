import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MemoryGameComponent implements OnInit {
  cards: { url: string, matched: boolean, flipped: boolean }[] = [];
  flippedCards: { index: number, url: string }[] = [];
  allMatched: boolean = false;

  private route = inject(ActivatedRoute);
  gameId!: number;

  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params => {
      this.gameId = +params['gameId'];
      console.log('Kapott gameId:', this.gameId);
    });

   
    this.initializeCards();
  }

  initializeCards(): void {
    const imageUrls = [
      'img/elephant.jpg',
      'img/lion.jpg',
      'img/fox.jpg'
    ];

    const duplicatedUrls = [...imageUrls, ...imageUrls];

    this.cards = duplicatedUrls
      .map(url => ({ url, matched: false, flipped: false }))
      .sort(() => Math.random() - 0.5);
  }

  flipCard(index: number): void {
    if (this.cards[index].flipped || this.cards[index].matched) return;

    this.cards[index].flipped = true;
    this.flippedCards.push({ index, url: this.cards[index].url });

    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
  }

  checkForMatch(): void {
    const [card1, card2] = this.flippedCards;

    if (card1.url === card2.url) {
      this.cards[card1.index].matched = true;
      this.cards[card2.index].matched = true;

      this.checkForWin();
    } else {
      setTimeout(() => {
        this.cards[card1.index].flipped = false;
        this.cards[card2.index].flipped = false;
      }, 1000);
    }

    this.flippedCards = [];
  }

  checkForWin(): void {
    this.allMatched = this.cards.every(card => card.matched);
  }

  restartGame(): void {
    this.cards = [];
    this.flippedCards = [];
    this.allMatched = false;
    this.initializeCards();
  }
}
