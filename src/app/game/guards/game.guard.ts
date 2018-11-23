import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GameService } from '../services/game.service';
import { GameplayComponent } from '../pages/gameplay/gameplay.component';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate, CanDeactivate<GameplayComponent> {

  constructor(
    private _gameService: GameService,
    private _router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this._gameService.started === false) {
        this._router.navigateByUrl('/welcome');
        return false;
      }

      return true;
  }

  canDeactivate(component: GameplayComponent): boolean {
    // use window.confirm & component.canUserLeave() to properly test the deactivation
    return false;
  }

}
