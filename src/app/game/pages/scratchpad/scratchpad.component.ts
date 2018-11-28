import { Component, OnInit, HostBinding, HostListener } from '@angular/core';

const deckOriginal = [1, 4, 5, 9, 12, -1, 3, 6, 9, -1, 2, 6, 7, -1, 4];
let deck = [...deckOriginal];

@Component({
  selector: 'skipbo-scratchpad',
  templateUrl: './scratchpad.component.html',
  styleUrls: ['./scratchpad.component.scss']
})
export class ScratchpadComponent implements OnInit {
  cards = [1];

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:click')
  addAnotherCard() {
    if (this.cards.length >= deckOriginal.length) {
      deck = [...deckOriginal];
      this.cards = [];
    }

    const newCard = deck.pop();
    this.cards.push(newCard);
  }

  @HostListener('window:keydown.space')
  toggleAll() {
    if (this.cards.length !== deckOriginal.length) {
      this.cards = [...deckOriginal];
    } else {
      this.cards = [];
    }
  }

}
