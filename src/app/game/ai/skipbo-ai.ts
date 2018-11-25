import { Subject } from 'rxjs';
import { create as createSpy } from 'rxjs-spy';
import { tag } from 'rxjs-spy/operators';
import { Game, logger } from 'skipbo-core';
import { tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { naivePlacementStrategy } from './placement-strategy';


createSpy({
  defaultPlugins: false
}).log(/finished|aborted/);

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
      switchMap(player => naivePlacementStrategy(player))
    ).subscribe();

    // autoplay for non humans
    this._game.newGame$.pipe(
      tag('🐙: New Game started 🆕')
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
