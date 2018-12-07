import { Component, Input } from '@angular/core';
import { Card } from 'skipbo-core';
import { AbstractCardZone } from '../../shared/abstract-card-zone';
import { trigger, transition, stagger, animateChild, query } from '@angular/animations';

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
    trigger('staggerCardAnimation', [
      transition('* => *', [
      //  query('@flipAnimation', [
      //   stagger(100, animateChild())
      //  ], { optional: true })
      ])
    ])
  ]
})
export class HandComponent extends AbstractCardZone {
  @Input() cards: Card[] = [];
  handSize = HAND_SIZE;

  // override
  enterPredicate() {
    return false;
  }

  staggerStart(event) {
    console.log('staggerStart', event);
  }

  staggerDone(event) {
    // console.log('staggerDone', event);
  }
}
