import { Game, Player, PlayerAction } from 'skipbo-core';
import { of, merge, pipe, Observable, fromEvent, throwError, combineLatest, Observer, interval, Subject } from 'rxjs';
import { tap, switchMap, mergeMap, filter, map, mergeAll, delay, takeWhile, takeUntil, catchError, first, endWith, take, toArray, mapTo, distinctUntilChanged, withLatestFrom, last, defaultIfEmpty, takeLast } from 'rxjs/operators';

import { create as createSpy } from 'rxjs-spy';
import { tag } from 'rxjs-spy/operators/tag';
import { logger } from 'src/skipbo-core/logger';

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

  watch() {
    console.log('ai start watching');

  }
  constructor(private _game: Game) {
    console.log('skipbo ai born', this._game);

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

    interface PlayerTryResult {
      cardPlayed: boolean;
      action: PlayerAction;
    }

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


    const keyPressed = (key: string) => fromEvent(window, 'keydown')
      .pipe(filter((event: KeyboardEvent) => event.key === key));


    const nextPlayer: Subject<Player> = new Subject();

    const turnAndComplete = ({speed = 500}) => pipe(
        map(player => player as Player),
        switchMap(player => {
          console.log('new player arrived');

          return interval(500).pipe(
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
            takeUntil(merge(this._game.abort$, this._game.gameOver$)),
            // block stream, only output when completed
            // without the stream would getarrive in the outer observable
            // which assumes the player turn to be completed by this point
            toArray()
          ).pipe(mapTo(player)); // mapTo in favor of using a projection function which is deprecated
        }, ),
        takeUntil(merge(this._game.abort$, this._game.gameOver$)),
        tap(player => player.discardHandCard())
      );

    this._game.nextTurn
    .pipe(
      tag('sutff'),
      turnAndComplete({speed: 50}),
    ).subscribe(
      () => console.log('turn completed'),
      () => console.log('error'),
      () => console.log('game completed')
    );

    keyPressed('r')
      .pipe(first()).subscribe(_ => {
        console.log('reset');
        this._game.reset();
    });
    // this._game.nextTurn.subscribe(nextPlayer)

    // this._game.nextTurn.subscribe();
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
