import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CardPileComponent } from '../card-pile/card-pile.component';
import { updateCards } from './update';
import { AbstractCardZone } from '../../shared/abstract-card-zone';

@Component({
  selector: 'skipbo-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['allowDrop', 'canDragItemsToZones', 'sourceName', 'allowedSources'],
  // tslint:disable-next-line:use-output-property-decorator
  outputs: ['cardDropped']
})
export class StockComponent extends AbstractCardZone {
  private _cards = [];
  @ViewChild(CardPileComponent) pile: CardPileComponent;
  @Input() autoRevealCard = true;

  @Input()
  set cards(value) {
    this._cards = value;
  }

  get  cards() {
    return this._cards;
  }
}
