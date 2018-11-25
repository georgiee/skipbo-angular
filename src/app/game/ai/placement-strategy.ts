import { Player, PlayerAction, logger } from 'skipbo-core';
import { Observer, Observable } from 'rxjs';

export interface PlayerTryResult {
  cardPlayed: boolean;
  action?: PlayerAction;
}

export const naivePlacementStrategyObservable = (player: Player) => {
  logger.group('🔽 Player Turn Step ');

  return Observable.create((observer: Observer<PlayerTryResult>) => {
      try {
        const result = tryAllTurnActions(player);
        logger.groupEnd();

        if (!result.cardPlayed) {
          logger.info('🐙: No card played, time to discard ☝️');
        }

        observer.next(result);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
  });
};


export const naivePlacementStrategyPipeable = <T>(source: Observable<Player>) => {
  return Observable.create((observer: Observer<PlayerTryResult>) => {
    source.subscribe({
      next (player) {
        logger.group('🔽 Player Turn Step ');
        observer.next(tryAllTurnActions(player));
        logger.groupEnd();
      },
      error(err) { observer.error(err); },
      complete() { observer.complete(); }
    });
  });
};


function tryAllTurnActions(player): PlayerTryResult {
  const orderedActions = [PlayerAction.PLAY_STOCK, PlayerAction.PLAY_HAND, PlayerAction.PLAY_DISCARD];

  let action: PlayerAction;
  let cardPlayed = false;

  while (orderedActions.length && !cardPlayed) {
    action = orderedActions.shift();
    try {
      cardPlayed = player.autoPlaceAction(action);
    } catch (error) {
      cardPlayed = false;
    }
  }

  return cardPlayed ? {cardPlayed, action} : {cardPlayed};
}
