import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'skipbo-core';

@Component({
  selector: 'skipbo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  constructor() { }
  @Input() value: Card;
  @Input() revealed: boolean = false;

  get currentFace() {
    return this.revealed ? this.value : Card.Back;
  }

  ngOnInit() {
  }

}
