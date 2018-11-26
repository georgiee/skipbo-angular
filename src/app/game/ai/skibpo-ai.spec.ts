import { SkipboAi } from './skipbo-ai';
import { Subject } from 'rxjs';
import { fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';

let player;
let gameMock;

fdescribe('Skipbo AI', () => {
  let ai: SkipboAi;

  beforeEach(() => {
    // nice bug if outside
    player = {
      _cpu: false,
      autoPlaceAction: () => false,
      discardHandCard: () => {},
      get isCPU() {
        return this._cpu;
      }
    };

    gameMock = {
      newGame$: new Subject(),
      gameOver$: new Subject(),
      abort$: new Subject(),
      nextTurn: new Subject()
    };

    ai = new SkipboAi(gameMock as any, false);
  });

  it('works', () => {
    expect(ai).toBeTruthy();
  });

  it('can start watch', () => {
    expect(() => {
      ai.watch();
    }).not.toThrowError();
  });

  // it('can start watch', fakeAsync(() => {
  //   ai.watch();
  //   gameMock.newGame$.next();
  //   gameMock.nextTurn.next(player);
  //   tick(10000);
  //   discardPeriodicTasks();
  // }));

  it('will play for cpus', fakeAsync(() => {
    player._cpu = true;
    ai.watch();

    const spyAutoPlace = spyOn(player, 'autoPlaceAction');
    gameMock.newGame$.next();
    gameMock.nextTurn.next(player);

    tick(1000);

    expect(spyAutoPlace).toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('will not play for non cpus', fakeAsync(() => {
    player._cpu = false;
    ai.watch();

    const spyAutoPlace = spyOn(player, 'autoPlaceAction');
    gameMock.newGame$.next();
    gameMock.nextTurn.next(player);

    tick(1000);

    expect(spyAutoPlace).not.toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('will try a second time after successfully placing a card', fakeAsync(() => {
    player._cpu = true;
    ai.watch();

    // this will simulate 4 successful cards and the next card will fail (3 times for stock, hand, discard)
    const spyAutoPlace = spyOn(player, 'autoPlaceAction').and.returnValues(true, false, false, false);
    const spyDiscard = spyOn(player, 'discardHandCard');

    gameMock.newGame$.next();
    gameMock.nextTurn.next(player);

    // we need
    // 1)   250ms (initial delay) +
    // 2) + 200ms (50ms between each turn, 4 times success -> 4 * 50ms)
    // 3) + 50ms (last one fails three times in a row)
    tick(500);

    // match the return value count of 7 calls
    expect(spyAutoPlace).toHaveBeenCalledTimes(4);

    // player always must discard to complete the turn
    expect(spyDiscard).toHaveBeenCalledTimes(1);
    discardPeriodicTasks();
  }));
});
