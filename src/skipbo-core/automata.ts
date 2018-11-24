import { ESCAPE } from '@angular/cdk/keycodes';
import { empty, fromEvent, merge, Observable, Observer, of, timer } from 'rxjs';
import {
  distinctUntilChanged, expand, filter, last,
  merge as mergeOperator, mergeMap,
  skip, takeUntil, takeWhile, tap
} from 'rxjs/operators';

import { Game } from './game';
import { logger } from './logger';
import { Player } from './player';

type IAction = () => boolean;

/*
Automata is my playground to create custom Observables.
I was lucky to find the expand operator as it fits
the format while(gameNotOver) {doSomething()}.

The lack of experience with really advanced usa cases in RxJs
makes the following code not the best examples
*/


const keyDowns = fromEvent(document, 'keydown');
const keyUps = fromEvent(document, 'keyup');

// signal clicks but only after the first click
const clicks = fromEvent(document, 'click')
  .pipe(
    skip(1) // skip the first click so a UI trigger won't cancel immediately
  );

  // watch for ESC pressed
const escKeyPressed = keyDowns.pipe(
    mergeOperator(keyUps),
    filter((e: KeyboardEvent) => e.keyCode === ESCAPE),
    distinctUntilChanged((x, y) => x.type === y.type)
);

const abortSignal = merge(escKeyPressed, clicks)
  .pipe(tap(_ => {
    logger.info('Automata aborted');
  }));

export class Automata {
  private _running = false;
  private _gameOver = false;
  private _turnCounter = 0;
  private _cardPlayed = false;
  constructor(
    private game: Game
  ) {

  }

  get running() {
    return this._running;
  }

  autorun(delaySteps = 100) {
    if (this._running) {
      return;
    }

    this._running = true;

    if (!this.game.started) {
      this.game.start();
    }

    // that will run turn by turn
    // completes by mouse click or ESC (signals we want to abort)
    // or if the game is over of coruse
    of(true)
    .pipe(
      expand((value) => this.playTurn(delaySteps)),
      takeUntil(abortSignal),
      takeUntil(this.game.gameOver$)
    ).subscribe(
      () => {
          // console.log('automata turn done')
      },
      () => {},
      () => {
        logger.info('Automata completed');
        this._running = false;
      });
  }

  playTurnSync() {
    this.playTurn().subscribe(() => {
      const player = this.game.currentPlayer;
      // this.game.nextPlayer();
    });
  }

  private _createStepObservable() {
    return Observable.create((observer: Observer<boolean>) => {
      try {
        const cardThrown = this.singleStep();
        observer.next(cardThrown);

        if (cardThrown === false) {
          observer.complete();
        }
      } catch (error) {
        observer.error(error);
      }
    });
  }

  playTurn(delaySteps = 250): Observable<any> {
    console.log('playTurn')
    // this._running = true;

    // logger.groupCollapsed('Automata Playing Turn');

    this._turnCounter++;
    const player = this.game.currentPlayer;

    if (!player.playing) {
      player.takeTurn();
    }

    const stepSource: Observable<boolean> = this._createStepObservable();

    // run as long as cards are played in a step (cardPlayed)
    // when completed discard hand card to give away the turn of the player

    return of(true).pipe(
      // will recursively merge our step source to it's called endlessley until we decide to stop the chain
      // that's when it's false — no card plaed so we can stop the loop
      expand(result => {
        if (result) {
          // card drawn — we can go on
          // use a timer to delay the execution
          // so people can see what happens in the UI

          return timer(delaySteps)
            .pipe(mergeMap(_ => stepSource));

        } else {
          return empty();
        }
      }),

      // signal completion, observables complete is ignored as I clearly do something wrong with the expand
      takeWhile(cardPlayed => cardPlayed === true),
      last(),
      tap(result => {
        console.log('done')
        player.discardHandCard();
        // this._running = false;
        // logger.groupEnd();
      }),
    );

  }

  singleStep() {
    if (this.game.currentPlayer.isWinner()) {
      throw new Error('Game is already over');
    }

    let cardPlayed = false;
    const actions: IAction[] = [this.tryStockCard, this.tryHandCard, this.tryDiscardPile];

    while (actions.length && !cardPlayed) {
      const action = actions.shift();
      cardPlayed = action.call(this);
    }

    return cardPlayed && !this.player.isWinner();
  }

  get player(): Player {
    return this.game.currentPlayer;
  }

  tryStockCard(): boolean {
    try {
      this.player.placeStockCard();
    } catch (error) {
      // console.log('tryStockCard failed', error.message);
      return false;
    }

    return true;
  }

  tryHandCard(): boolean {
    try {
      this.player.placeHandCard();
    } catch (error) {
      // console.log('tryHandCard failed', error.message);
      return false;
    }

    return true;
  }

  tryDiscardPile(): boolean {
    try {
      this.player.placeDiscardCard();
    } catch (error) {
      // console.log('tryDiscardPile failed', error.message);
      return false;
    }

    return true;
  }
}
