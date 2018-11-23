import { Injectable } from '@angular/core';
import { Card, Game, Player, Deck, PileGroup, BuildingPile, Automata } from 'skipbo-core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _game: Game;
  private _automata: Automata;

  constructor(
  ) {
    this._game = new Game();
    this._automata = new Automata(this.game);
  }
  get ready() {
    return this._game.players.length >= 2;
  }

  get deck(): Deck {
    return this._game.deck;
  }

  get building(): PileGroup<BuildingPile> {
    return this._game.buildingGroup;
  }

  get game(): Game {
    return this._game;
  }

  get automata(): Automata {
    return this._automata;
  }

  get started() {
    return this._game.started;
  }

  start() {
    this._game.start();
  }

  reset() {
  }

  enableLogging() {
    this._game.enableLogging();
  }
}
