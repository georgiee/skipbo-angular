import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Card } from 'skipbo-core';
import { padArray } from 'src/app/utils';

const NUMBER_CARDS = 5;

@Component({
  selector: 'skipbo-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent {
  @Input() cards: Card[] = [];

  get displayedCards(): Card[] {
    return padArray(Array.from(this.cards), NUMBER_CARDS);
  }
}
