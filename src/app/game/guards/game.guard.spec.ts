import { TestBed, async, inject } from '@angular/core/testing';

import { GameGuard } from './game.guard';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

class GameServiceStub {
  private _started = false;

  get started() {
    return this._started;
  }

  start() {
    this._started = true;
  }
}

class RouterStub {
  navigateByUrl = () => {};
}

describe('GameGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameGuard,
        { provide: GameService, useClass: GameServiceStub },
        { provide: Router, useClass: RouterStub }
      ]
    });
  });

  describe('CanActivate', () => {
    it('should call started in game service', inject([GameGuard, GameService], (guard: GameGuard, gameService: GameService) => {
      const startedSpy = spyOnProperty(gameService, 'started').and.callThrough();
      guard.canActivate(null, null);

      expect(startedSpy).toHaveBeenCalled();
    }));

    it('should block when game is not started', inject([GameGuard, GameService], (guard: GameGuard, gameService: GameService) => {
      const startedSpy = spyOnProperty(gameService, 'started').and.callThrough();

      expect(guard.canActivate(null, null)).toBeFalsy();
      expect(startedSpy).toHaveBeenCalled();
    }));

    it('should allow when game has started', inject([GameGuard, GameService], (guard: GameGuard, gameService: GameService) => {
      const startedSpy = spyOnProperty(gameService, 'started').and.callThrough();

      expect(guard.canActivate(null, null)).toBeFalsy();

      gameService.start();

      expect(guard.canActivate(null, null)).toBeTruthy();
      expect(startedSpy).toHaveBeenCalled();
    }));

    it('should redirect to welcome when the route is rejected',
      inject([GameGuard, GameService, Router],
          (guard: GameGuard, gameService: GameService, router: Router) => {
      const startedSpy = spyOnProperty(gameService, 'started').and.callThrough();
      const navigateSpy = spyOn(router, 'navigateByUrl');

      expect(guard.canActivate(null, null)).toBeFalsy();

      expect(startedSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith('/welcome');
    }));
  });

  describe('CanDectivate', () => {

    it('should call canUserLeave in GameplayComponent', inject([GameGuard, GameService], (guard: GameGuard, gameService: GameService) => {
      const componentSpy = jasmine.createSpyObj('GameplayComponent', {
        'canUserLeave': true
      });

      guard.canDeactivate(componentSpy);

      expect(componentSpy.canUserLeave).toHaveBeenCalled();
    }));

    it('should allow leave when canUserLeave is true',
      inject([GameGuard], (guard: GameGuard) => {
      const componentSpy = jasmine.createSpyObj('GameplayComponent', {
        'canUserLeave': true
      });

      expect(guard.canDeactivate(componentSpy)).toBeTruthy();
      expect(componentSpy.canUserLeave).toHaveBeenCalled();
    }));

    it('should show window confirm dialog when canUserLeave is false',
      inject([GameGuard], (guard: GameGuard) => {
      const componentSpy = jasmine.createSpyObj('GameplayComponent', {
        'canUserLeave': false
      });

      spyOn(window, 'confirm').and.returnValue(true);

      const canDeactivateResult = guard.canDeactivate(componentSpy);

      expect(canDeactivateResult).toBe(true);
      expect(window.confirm).toHaveBeenCalled();
      expect(componentSpy.canUserLeave).toHaveBeenCalled();
    }));
  });

});
