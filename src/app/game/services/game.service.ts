import { Injectable } from '@angular/core';
import { Card } from 'skipbo-core';

@Injectable()
export class GameService {
  private _deck: Card[] = [1, 2, 3, 4, 5, 6, 7, 8, -1];
  private _building: Card[] = [];

  constructor() { }

  get deck(): Card[] {
    return this._deck;
  }

  get building(): Card[] {
    return this._building;
  }

  get game() {
    return null;
  }

  start() {
  }

  reset() {
  }

  buildFromDeck() {
    const card = this._deck.pop();
    this._building.push(card);
    // this._building = [ ...this.building, this.deck.pop() ];
    // this._deck = [...this.deck];
  }

  backToDeck() {
    const card = this._building.pop();
    this._deck.push(card);
    // this._deck = [ ...this.deck, this.building.pop() ];
    // this._building = [ ...this.building ];
  }

}
