import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'skipbo-core';

const MAX_CARD_DISPLAY = 5;

@Component({
  selector: 'skipbo-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.scss']
})
export class PileComponent implements OnInit {
  @Input() cards: Card[] = [];

  public get empty() {
    return this.cards.length === 0;
  }

  get displayedCards(): Card[] {
    return this.cards.slice(-MAX_CARD_DISPLAY);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
