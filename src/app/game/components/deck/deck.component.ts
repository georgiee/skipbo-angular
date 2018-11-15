import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { Card } from 'skipbo-core';

@Component({
  selector: 'skipbo-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  private _cards: Card[];

  @Input()
  set cards (value: Card[]) {
    this._cards = [...value];
  }
  get cards() {
    return this._cards;
  }

  constructor() { }

  @HostListener('click')
  handleClick() {
    // this.cards.pop();
    // console.log(this.cards.length)
  }

  ngOnInit() {
  }

}
