import { Component, Input } from '@angular/core';
import { Card } from 'skipbo-core';
import { AbstractCardZone } from '../../shared/abstract-card-zone';
import { trigger, style, stagger, animateChild, transition, query, animate } from '@angular/animations';

const HAND_SIZE = 5;

@Component({
  selector: 'skipbo-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss'],
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['allowDrop', 'canDragItemsToZones', 'sourceName', 'allowedSources'],
  // tslint:disable-next-line:use-output-property-decorator
  outputs: ['cardDropped'],
  animations: [
    trigger('receiveCards', [
      transition(':increment, :enter', [
        query('@flipAnimation', [
          stagger(100, [
            animateChild()
          ])
        ], {optional: true})
      ]),
    ])
  ]
})
export class HandComponent extends AbstractCardZone {
  @Input() cards: Card[] = [];
  handSize = HAND_SIZE;

  getCard(index) {
    if ( index < this.cards.length) {
      return this.cards[index];
    }
    return Card.Empty;
  }

  // override
  enterPredicate() {
    return false;
  }

}
