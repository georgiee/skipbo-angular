import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'skipbo-core';

@Component({
  selector: 'skipbo-stock-pile',
  templateUrl: './stock-pile.component.html',
  styleUrls: ['./stock-pile.component.scss']
})
export class StockPileComponent implements OnInit {
  @Input() cards: Card[] = [];

  constructor() { }

  ngOnInit() {
  }

}
