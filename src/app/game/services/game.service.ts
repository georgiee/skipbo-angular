import { Injectable } from '@angular/core';
import { Card, Game } from 'skipbo-core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _deck: Card[] = [];
  private _building: Card[] = [];
  private _started = false;
  private _game: Game;

  constructor() {
    this._game = new Game();
  }

  get deck(): Card[] {
    return this._deck;
  }

  get building(): Card[] {
    return this._building;
  }

  get game() {
    return this._game;
  }

  get started() {
    return this._started;
  }

  get ready() {
    return this._game.players.length >= 2;
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

    // const card = this._deck.pop();
    // this._building.push(card);
    this._building = [ ...this.building, this.deck.pop() ];
    this._deck = [...this.deck];
  }

  backToDeck() {
    if (this._building.length === 0) {
      return;
    }

    // const card = this._building.pop();
    // this._deck.push(card);
    this._deck = [ ...this.deck, this.building.pop() ];
    this._building = [ ...this.building ];
  }

}
