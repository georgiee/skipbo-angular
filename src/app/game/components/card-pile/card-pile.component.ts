import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { Card } from 'skipbo-core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

const MAX_CARD_DISPLAY = 8;
@Component({
  selector: 'skipbo-card-pile',
  templateUrl: './card-pile.component.html',
  styleUrls: ['./card-pile.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPileComponent {
  private _cards: Card[] = [];
  _stackCardsCount = 0;

  @Input()
  set cards (value: Card[]) {
    this._cards = value || [];
    this._stackCardsCount = Math.min(this._cards.length, MAX_CARD_DISPLAY) - 1;
  }

  get cards(): Card[] {
    return this._cards;
  }

  get empty() {
    return !this._cards || this._cards.length === 0;
  }

  public get topCard(): Card {
    return this._cards[this._cards.length - 1];
  }
}
