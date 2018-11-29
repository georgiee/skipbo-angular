import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from 'skipbo-core';
import { AbstractCardZone } from '../../shared/abstract-card-zone';



const MAX_CARD_DISPLAY = 8;
@Component({
  selector: 'skipbo-card-pile',
  templateUrl: './card-pile.component.html',
  styleUrls: ['./card-pile.component.scss'],
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['dragEnabled', 'allowDrop', 'canDragItemsToZones', 'sourceName', 'allowedSources'],
  // tslint:disable-next-line:use-output-property-decorator
  outputs: ['cardDropped']
})
export class CardPileComponent extends AbstractCardZone {
  private _cards: Card[] = [];
  _stackCardsCount = 0;

  @Input() autoRevealCard = false;
  @Input() animateTopCardFlip = false;

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

  constructor() {
    super();
  }
}
