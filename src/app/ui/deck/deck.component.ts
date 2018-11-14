import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'skipbo-core';

@Component({
  selector: 'skipbo-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  @Input() cards: Card[] = [1,2,3,-1,-1,2,12,-1];
  constructor() { }

  ngOnInit() {
  }

}
