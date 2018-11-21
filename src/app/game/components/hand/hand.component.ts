import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Card } from 'skipbo-core';
import { padArray } from 'src/app/utils';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { CardZone } from 'src/app/shared/card-zone';

const HAND_SIZE = 5;

@Component({
  selector: 'skipbo-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent {
  @Input() cards: Card[] = [];
  @ViewChild('dropzone') _dropzone: CdkDropList;
  @Input() canDragItemsToZones: CdkDropList[] = [];
  handSize = HAND_SIZE;

  getCard(index) {
    if ( index < this.cards.length) {
      return this.cards[index];
    }
    return Card.Empty;
  }

  enterPredicate() {
    return false;
  }

}
