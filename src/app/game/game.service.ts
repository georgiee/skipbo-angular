import { Injectable } from '@angular/core';
import { Game } from '../skipbo-core/game';
import { getFullTestDeck, getTwoPlayerTestGame } from '../skipbo-core/testdeck';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _game: Game;

  constructor() {
    this._game = new Game();
    // this._game = new Game(getFullTestDeck(), {stockCardCount: 5});
    // this._game = getTwoPlayerTestGame();
  }

  get game(): Game {
    return this._game;
  }

  get winner(): Observable<any> {
    return this._game.winnerChanges;
  }

  enableLogging() {
    this._game.enableLogging();
  }
}
