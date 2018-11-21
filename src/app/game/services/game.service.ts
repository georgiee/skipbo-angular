import { Injectable } from '@angular/core';
import { Game, getFullTestDeck, getTwoPlayerTestGame, Player  } from 'skipbo-core';
import { Observable } from 'rxjs';
import { Automata } from 'skipbo-core';
import { first, filter } from 'rxjs/operators';
import { BuildingPile } from 'skipbo-core';
import { PileGroup } from 'skipbo-core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _game: Game;
  private _automata: Automata;

  constructor() {
    this._game = new Game();
    this._game.nextTurn
    .pipe(filter(_ => this._automata.running === false))
    .subscribe((player: Player) => {
      if (player.isCPU) {
        this._automata.playTurnSync();
      }
    });

    this._automata = new Automata(this.game);
    // this._game = new Game(getFullTestDeck(), {stockCardCount: 5});
    // this._game = getTwoPlayerTestGame();
  }

  get gameOver() {
    return this._game.gameOverObservable;
  }

  start() {
    this._game.start();
  }

  reset() {
    this._game.reset();
  }

  createPlayer(name: string = null, options = null): Player {
    return this._game.createPlayer(name, options);
  }

  removePlayer() {
    this._game.removePlayer();
  }

  get players() {
    return this._game.players;
  }

  get buildingGroup(): PileGroup<BuildingPile> {
    return this._game.buildingGroup;
  }

  get deck() {
    return this._game.deck;
  }

  get currentPlayer(): Player {
    return this._game.currentPlayer;
  }

  get game(): Game {
    return this._game;
  }

  get automata(): Automata {
    return this._automata;
  }

  get winner(): Observable<any> {
    return this._game.winnerChanges;
  }

  getWinner() {
    return this._game.winner;
  }

  enableLogging() {
    this._game.enableLogging();
  }
}
