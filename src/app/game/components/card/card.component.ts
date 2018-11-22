import { Component, OnInit, Input, Host, Optional } from '@angular/core';
import { Card } from 'skipbo-core';
import { CardPileComponent } from '../card-pile/card-pile.component';

@Component({
  selector: 'skipbo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() value: Card;
  @Input() revealed: boolean = false;

  get currentFace() {
    return this.revealed ? this.value : Card.Back;
  }
  constructor() {
  }

  ngOnInit() {
  }

}
