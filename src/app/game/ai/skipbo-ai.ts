import { Subject } from 'rxjs';
import { create as createSpy } from 'rxjs-spy';
import { tag } from 'rxjs-spy/operators';
import { switchMap, withLatestFrom, filter, delay, tap } from 'rxjs/operators';
import { Game, logger, Player } from 'skipbo-core';
import { naivePlacementStrategyObservable } from './placement-strategy';


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
      tag('🐙: Manual Turn triggered'),
      switchMap(player => naivePlacementStrategyObservable(player))
    ).subscribe();

    // autoplay for non humans
    this._game.newGame$.pipe(
      tag('🐙: New Game started 🆕'),
      switchMap(_ => this._game.nextTurn
          .pipe(
            filter(player => player.isCPU ),
            delay(500),
            tag('CPU Player takes turn - implement play here 🔽'),
            // use `naivePlacementStrategyObservable` somehow here
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
