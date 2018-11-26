import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CardPileComponent } from '../card-pile/card-pile.component';
import { updateCards } from './update';

@Component({
  selector: 'skipbo-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockComponent implements OnInit {
  private _cards = [];
  @ViewChild(CardPileComponent) pile: CardPileComponent;

  @Input()
  set cards(value) {
    // remove the optimization. update cards is only modifying the reference. that's often bad but especially with onPush.
    // updateCards(this, value);
    this._cards = value;
  }

  get  cards() {
    return this._cards;
  }

  constructor(
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

}
