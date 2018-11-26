import { SkipboAi } from './skipbo-ai';
import { Subject } from 'rxjs';
import { fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';

let playerMock;
let gameMock;

fdescribe('Skipbo AI', () => {
  let ai: SkipboAi;

  beforeEach(() => {
    playerMock = {
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

  it('will play for cpus', fakeAsync(() => {
    playerMock._cpu = true;
    ai.watch();

    const spyAutoPlace = spyOn(playerMock, 'autoPlaceAction');
    gameMock.newGame$.next();
    gameMock.nextTurn.next(playerMock);

    tick(1000);

    expect(spyAutoPlace).toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('will not play for non-cpus', fakeAsync(() => {
    pending('build me 🤞');
  }));
});
