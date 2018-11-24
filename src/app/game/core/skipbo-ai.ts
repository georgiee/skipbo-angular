import { Game, Player } from 'skipbo-core';
import { of, merge, pipe } from 'rxjs';
import { tap, switchMap, mergeMap, filter, map, mergeAll, delay } from 'rxjs/operators';


// const forEachPlayersTurn = () =>
//   pipe(
//     switchMap(_ => {
//       return of(_)
//         .pipe(
//           mergeMap(player => player),
//           filter(player => player.isCPU),
//           mergeMap(player => player.nextTurn)
//         );
//     })
//   );

export class SkipboAi {
  constructor(private _game: Game) {
    console.log('skipbo ai was born', this._game);
    this._game.nextTurn.pipe(
      tap(player => console.log('---> next players turn', player))
    ).subscribe();

    merge(this._game.players$)
    .pipe(
      // switch maintains only a single subscription
      // that's what we want, discard everything when a new list of players
      // arrives
      switchMap(players => {
          return of(players)
            .pipe(
              mergeMap(player => player),
              filter(player => player.isCPU),
              mergeMap(player => player.nextTurn)
            );
      }),
      tap(player => console.log('Player CPU has current turn: ', player)),
      delay(500),
      tap(player => {
        player.discardHandCard();
      })
    )
    .subscribe();


    merge(this._game.players$).subscribe( players => {
      console.log('player amoutn changed', players);
    });
  }
}
