import { Player, PlayerAction, logger } from 'skipbo-core';
import { Observer, Observable } from 'rxjs';

export interface PlayerTryResult {
  cardPlayed: boolean;
  action: PlayerAction;
}

export const naivePlacementStrategy = (player: Player) => {
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
          logger.info('🐙: No card played, time to discard ☝️');
          observer.next({cardPlayed: false, action: null});
        }


        observer.complete();
      } catch (error) {
        observer.error(error);
      }
  });
};
