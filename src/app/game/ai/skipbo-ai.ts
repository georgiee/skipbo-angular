import { fromEvent, interval, merge, Observable, Observer, of, pipe, Subject } from 'rxjs';
import { create as createSpy } from 'rxjs-spy';
import { tag } from 'rxjs-spy/operators/tag';
import { filter, first, map, mapTo, switchMap, takeUntil, takeWhile, tap, toArray, withLatestFrom } from 'rxjs/operators';
import { Game, Player, PlayerAction } from 'skipbo-core';
import { logger } from 'src/skipbo-core/logger';


createSpy().log();

const tryBuildingObservable = (player: Player) => {
  const orderedActions = [PlayerAction.PLAY_STOCK, PlayerAction.PLAY_HAND, PlayerAction.PLAY_DISCARD];
  logger.group('🔽 Player Turn Step ');

  return Observable.create((observer: Observer<PlayerTryResult>) => {
      try {
        let cardPlayed = false;
        let action: PlayerAction;

        while (orderedActions.length && !cardPlayed) {
          action = orderedActions.shift();
          cardPlayed = player.autoPlaceAction(action);
        }

        logger.groupEnd();

        if (cardPlayed) {
          observer.next({cardPlayed, action});
        } else {
          observer.next({cardPlayed: false, action: null});
        }


        observer.complete();
      } catch (error) {
        observer.error(error);
      }
  });
};


const turnAndComplete = (game: Game, {speed = 500, playHumans = true}) => pipe(
  map(player => player as Player),
  filter(player => playHumans || player.isCPU ),
  switchMap(player => {
    return interval(speed).pipe(
      switchMap(_ =>
        // we want to switch over to this stream
        // which will try all possible build actions for a player
        tryBuildingObservable(player)
      ),
      // stop the interval and therefor complete the stream
      // if cardPlayed is true, the player just placed a card
      // and therefore might be able to play another card
      // so: don't complete and wait instead for interval trigger another stream coming from `tryBuildingObservable`
      takeWhile( (result: PlayerTryResult) => result.cardPlayed),
      takeUntil(merge(game.abort$, game.gameOver$)),
      // block stream, only output when completed
      // without the stream would getarrive in the outer observable
      // which assumes the player turn to be completed by this point
      toArray()
    ).pipe(mapTo(player)); // mapTo in favor of using a projection function which is deprecated
  }, ),
  takeUntil(merge(game.abort$, game.gameOver$)),
  tap(player => player.discardHandCard())
);

interface PlayerTryResult {
  cardPlayed: boolean;
  action: PlayerAction;
}

export class SkipboAi {
  private _playTurn = new Subject();

  constructor(private _game: Game) {
    console.log('Skip-Bo AI born', this._game);
  }

  playTurn() {
    this._playTurn.next();
  }

  watch() {
    // allow manual trigger of a human auto turn
    this._playTurn.pipe(
      withLatestFrom(this._game.nextTurn, (_, player) => player),
      switchMap( player => {
        return of(player).pipe(
          turnAndComplete(this._game, {speed: 50, playHumans: true})
        );
      })
    ).subscribe();

    // autoplay for non humans
    this._game.newGame$.pipe(
      switchMap(_ => {
        return this._game.nextTurn
          .pipe(
            turnAndComplete(this._game, {speed: 100, playHumans: false})
          );
      })
    ).subscribe();
  }
}
