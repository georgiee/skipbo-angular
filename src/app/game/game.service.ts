import { Injectable } from '@angular/core';
import { Game } from '../skipbo-core/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _game: Game;

  constructor() {
    this._game = new Game();
  }

  get game(): Game {
    return this._game;
  }

  enableLogging() {
    this._game.enableLogging();
  }
}
