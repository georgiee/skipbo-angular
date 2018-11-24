import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';
import { Automata, BuildingPile, Deck, Game, PileGroup, Player } from 'skipbo-core';
import { SkipboAi } from '../ai/skipbo-ai';
import { merge, BehaviorSubject, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export const GAME_DECK_TOKEN = new InjectionToken('GAME_DECK_TOKEN');

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _game: Game;
  private _ai: SkipboAi;
  private _gameEnded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _currentWinner = new BehaviorSubject<Player>(null);

  constructor(
    @Optional() @Inject(GAME_DECK_TOKEN) gameDeckDebug: Game
  ) {
    this._game = gameDeckDebug || new Game(null, {stockCardCount: 5});
    this._ai = new SkipboAi(this.game);
    this._ai.watch();
  }

  get ready() {
    return this._game.players.length >= 2;
  }

  get deck(): Deck {
    return this._game.deck;
  }

  get winner$(): Observable<Player> {
    return this._currentWinner.asObservable();
  }

  get building(): PileGroup<BuildingPile> {
    return this._game.buildingGroup;
  }

  get game(): Game {
    return this._game;
  }

  get ai(): SkipboAi {
    return this._ai;
  }

  get started() {
    return this._game.started;
  }

  start() {
    console.log('start a new game');
    this._game.start();

    this._game.winner$.subscribe((player) => {
      this._currentWinner.next(player);
    });

    merge(this._game.abort$, this._game.gameOver$).pipe(
      mapTo(true)
    ).subscribe(this._gameEnded);
  }

  reset() {
    this._game.reset();
  }

  enableLogging() {
    this._game.enableLogging();
  }

  get gameEnded$() {
    return this._gameEnded.asObservable();
  }
}
