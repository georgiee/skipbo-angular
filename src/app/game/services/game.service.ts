import { Injectable } from '@angular/core';
import { Automata, BuildingPile, Deck, Game, PileGroup } from 'skipbo-core';
import { SkipboAi } from '../core/skipbo-ai';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _game: Game;
  private _automata: Automata;
  private _ai: SkipboAi;

  constructor(
  ) {
    this._game = new Game();
    this._automata = new Automata(this.game);
    this._ai = new SkipboAi(this.game);
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
