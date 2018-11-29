import { Component, Input } from '@angular/core';
import { Card } from 'skipbo-core';
import { AbstractCardZone } from '../../shared/abstract-card-zone';

const HAND_SIZE = 5;

@Component({
  selector: 'skipbo-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss'],
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['allowDrop', 'canDragItemsToZones', 'sourceName', 'allowedSources'],
  // tslint:disable-next-line:use-output-property-decorator
  outputs: ['cardDropped']
})
export class HandComponent extends AbstractCardZone {
  @Input() cards: Card[] = [];
  handSize = HAND_SIZE;

  // override
  enterPredicate() {
    return false;
  }

}
