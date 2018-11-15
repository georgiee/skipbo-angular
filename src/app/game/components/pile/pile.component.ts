import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'skipbo-core';
import { allSettled } from 'q';

const MAX_CARD_DISPLAY = 12;

@Component({
  selector: 'skipbo-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.scss']
})
export class PileComponent implements OnInit {
  @Input() cards: Card[] = [];
  @Input() autoRevealCard = false;

  private _displayCount = 3;

  @Input()
  set displayCount(value) {
    this._displayCount = Math.max(value, MAX_CARD_DISPLAY);
  }
  get displayCount() {
    return this._displayCount;
  }

  public get empty() {
    return this.cards.length === 0;
  }

  get displayedCards(): Card[] {
    return this.cards.slice(-this.displayCount);
  }

  constructor() {
  }

  ngOnInit() {
  }

  enter(event) {
    console.log('enter')
  }

  dropCard(event) {
    console.log('dropCard')
  }

}
