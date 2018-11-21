import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'skipbo-playing',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  private _destroyed: Subject<any> = new Subject();

  constructor(
    private _gameService: GameService,
    private _router: Router
  ) {
    this._gameService.enableLogging();
    this._gameService.reset();

  }

  ngOnInit() {
    this._gameService.gameOver
      .pipe(
        takeUntil(this._destroyed),
        first()
      ).subscribe(() => {
        this._router.navigate(['/game/gameover']);
      });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

}
