import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'skipbo-core';
import { allSettled } from 'q';
import { transition, style, animate, trigger, animateChild } from '@angular/animations';
import { query } from '@angular/core/src/render3';

const MAX_CARD_DISPLAY = 12;

@Component({
  selector: 'skipbo-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.scss'],
  animations: [

  ]
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

  get displayedCards(): {value: Card, index: number}[] {
    const cards = this.cards.slice(-this.displayCount);
    const totalCount = this.cards.length;

    const cardsWithIndex = cards.map((card, index) => {
      return { value: card, index: (totalCount - index) };
    });

    return cardsWithIndex;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
