import { Injectable } from '@angular/core';
import { Game, getFullTestDeck, getTwoPlayerTestGame, Player  } from 'skipbo-core';
import { Observable } from 'rxjs';
import { Automata } from 'src/app/skipbo-core/automata';
import { first, filter } from 'rxjs/operators';

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
      console.log('player next turn', player.isCPU)
      if (player.isCPU) {
        this._automata.playTurnSync();
      }
    });

    this._automata = new Automata(this.game);
    // this._game = new Game(getFullTestDeck(), {stockCardCount: 5});
    // this._game = getTwoPlayerTestGame();
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

  enableLogging() {
    this._game.enableLogging();
  }
}
