import { Game, Player } from 'skipbo-core';
import { of, merge, pipe, Observable, fromEvent, throwError, combineLatest, Observer, interval } from 'rxjs';
import { tap, switchMap, mergeMap, filter, map, mergeAll, delay, takeWhile, takeUntil, catchError, first, endWith, take, toArray, mapTo } from 'rxjs/operators';

import { create as createSpy } from 'rxjs-spy';
import { tag } from 'rxjs-spy/operators/tag';

createSpy().log();

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

const nextPlayerTurn = () => pipe(
  switchMap((players: Player[]) => {
    return of(players).pipe(
      mergeMap(player => player),
      filter(player => player.isCPU),
      mergeMap(player => player.nextTurn)
    );
  })
);

const nextPlayerTurn2 = pipe(
  mergeMap<Observable<Player>, Player>(player => player),
  filter(player => player.isCPU),
  mergeMap(player => player.nextTurn)
);

export class SkipboAi {
  constructor(private _game: Game) {

    const gameOver = fromEvent(window, 'keydown')
    .pipe(
      filter((event: KeyboardEvent) => event.key === 'o')
    );

    console.log('skipbo ai was born', this._game);


    const userAction = (action: string) => pipe(
      map((player: Player) => {
        try {
          return player[action]();
        } catch (Error) {
          console.log('---> eeror catch')
          return false;
        }
      }),
      tag('userAction'),
      catchError(_ => {
        console.log('error catched');
        return of(false);
      })
    );

    const actions = [
      'placeStockCard',
      'placeHandCard',
    ];

    const spaceKeyPressed$ = fromEvent(window, 'keydown')
    .pipe(
      filter((event: KeyboardEvent) => event.key === 'x')
    )

    enum PlayerAction {
      PLAY_STOCK = 1,
      PLAY_HAND,
      PLAY_DISCARD,
      DISCARD
    }


    interface PlayerTryResult {
      cardPlayed: boolean;
      action: PlayerAction;
    }

    const playerTriesObservable = (player: Player) => {
      const orderedActions = [PlayerAction.PLAY_STOCK, PlayerAction.PLAY_HAND, PlayerAction.PLAY_DISCARD];

      function runAction(action: PlayerAction): boolean {
        try {
          switch (action) {
            case PlayerAction.PLAY_STOCK:
              // console.log('try play stock')
              return player.placeStockCard();
            case PlayerAction.PLAY_HAND:
              // console.log('try play hand')
              return player.placeHandCard();
            case PlayerAction.PLAY_DISCARD:
              // console.log('try play discard')
              return player.placeHandCard();
          }
        } catch (Error) {
          return false;
        }
      }

      return Observable.create((observer: Observer<PlayerTryResult>) => {
          try {
            let cardPlayed = false;
            let action: PlayerAction;

            while (orderedActions.length && !cardPlayed) {
              action = orderedActions.shift();
              cardPlayed = runAction(action);
            }

            if (cardPlayed) {
              observer.next({cardPlayed, action});
            } else {
              console.log('No card was played, stop turn!');
              observer.next({cardPlayed: false, action: null});
            }

            observer.complete();
          } catch (error) {
            observer.error(error);
          }
      });
    };

    const playTurn  = combineLatest(interval(500), this._game.nextTurn, (keyEvent, player) => player )
      .pipe(
        switchMap(player => {
          return playerTriesObservable(player)
            .pipe(
              tag('turn result')
            );
        }),
        takeWhile( (result: PlayerTryResult) => result.cardPlayed),
        tag('➡️ player turn completed')
      );

      this._game.nextTurn
      .pipe(
        tag('Current Player Turn'),
        switchMap(player => {
          return interval(50).pipe(
            switchMap(_ => playerTriesObservable(player)),
            takeWhile( (result: PlayerTryResult) => result.cardPlayed),
            toArray()
          ).pipe(mapTo(player));
        }, ),
        tag('Player Turn DONE!'),
        tap(player => player.discardHandCard())
      )
      .subscribe();
    // playTurn.subscribe();

    // userAction()
    // userAction('placeStockCard')
    // userAction('placeStockCard')
    // this._game.nextTurn.pipe(
    //   tag('currentPlayer'),
    //   userAction('placeStockCard'),
    //   map(result => {
    //     console.log('result', result)
    //   })
    // ).subscribe();

    // const player: Player;

    // player.placeStockCard()
    // player.placeHandCard()
    // player.placeDiscardCard();
    // this._game.nextTurn.pipe(
    //   takeUntil(
    //     gameOver
    //       .pipe(
    //         tap(_ => console.log('game over!')),
    //         tag('gameover-tag')
    //       )
    //   ),
    //   tap(player => console.log('---> next players turn', player)),
    //   tag('player turn')
    // ).subscribe();


    // merge(this._game.players$)
    // .pipe(
    //   // switch maintains only a single subscription
    //   // that's what we want, discard everything when a new list of players
    //   // arrives
    //   nextPlayerTurn(),
    //   tap(player => console.log('Player CPU has current turn: ', player)),
    //   delay(500),
    //   tap(player => {
    //     // player.discardHandCard();
    //   })
    // )
    // .subscribe();


    // merge(this._game.players$).subscribe( players => {
    //   console.log('player amoutn changed', players);
    // });
  }
}
