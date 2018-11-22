import { Injectable } from '@angular/core';
import { Card } from 'skipbo-core';

@Injectable()
export class GameService {
  private _deck: Card[] = [];
  private _building: Card[] = [];
  private _started = false;

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

  get started() {
    return this._started;
  }

  start() {
    this._deck = [1, 12, 3, -1, 5, 10, 6, 7, 8, -1];
    this._started = true;
  }

  reset() {
  }

  buildFromDeck() {
    if (this._deck.length === 0) {
      return;
    }

    const card = this._deck.pop();
    this._building.push(card);
  }

  backToDeck() {
    if (this._building.length === 0) {
      return;
    }

    const card = this._building.pop();
    this._deck.push(card);
  }

}
