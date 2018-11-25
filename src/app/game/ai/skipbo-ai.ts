import { Subject, interval } from 'rxjs';
import { create as createSpy } from 'rxjs-spy';
import { tag } from 'rxjs-spy/operators';
import { Game, logger, Player } from 'skipbo-core';
import { tap, switchMap, withLatestFrom, filter, mapTo, delay, mergeMap, take, toArray } from 'rxjs/operators';
import { naivePlacementStrategyObservable, naivePlacementStrategyPipeable } from './placement-strategy';


createSpy({
  defaultPlugins: false
}).log();


export class SkipboAi {
  private _playTurn = new Subject();

  constructor(private _game: Game) {
    console.log('Skip-Bo AI 🐙 was born 🌟');
  }

  playTurn() {
    logger.info('🐙: I will take this turn');
    this._playTurn.next();
  }

  watch() {
    // allow manual trigger of a human auto turn
    this._playTurn.pipe(
      withLatestFrom(this._game.nextTurn, (_, player) => player),
      switchMap(player => naivePlacementStrategyObservable(player)),
      tag('🐙: Manual Turn triggered')
    ).subscribe();

    // autoplay for non humans
    this._game.newGame$.pipe(
      tag('🐙: New Game started 🆕'),
      switchMap(_ => this._game.nextTurn
          .pipe(
            filter(player => player.isCPU ),
            delay(500),
            tag('CPU Player takes turn'),
            switchMap(player => {
              return interval(500)
              .pipe(
                mapTo(player),
                take(10),
                naivePlacementStrategyPipeable,
                toArray(),
                mapTo(player)
              );
            }),
            tap((player: Player) => player.discardHandCard())
          )
      )
    ).subscribe();

    // gameover signal
    this._game.gameOver$.pipe(
      tag('🐙: Game just finished 🏅')
    ).subscribe();

    // game abort signal;
    this._game.abort$.pipe(
      tag('🐙: Game just aborted ⏹')
    ).subscribe();
  }
}
