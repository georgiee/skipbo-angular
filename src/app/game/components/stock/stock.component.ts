import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'skipbo-core';

@Component({
  selector: 'skipbo-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  @Input() cards: Card[] = [];

  constructor() { }

  ngOnInit() {
  }

}
