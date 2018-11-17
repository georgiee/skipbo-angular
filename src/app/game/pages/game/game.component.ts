import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from 'skipbo-core';
import { GameService } from '../../services/game.service';
import { BuildingPile } from 'src/app/skipbo-core/pile/building-pile';
import { PileGroup } from 'src/app/skipbo-core/pile/pile-group';
import { Deck } from 'src/app/skipbo-core/deck';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

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
    this._gameService.game.reset();

  }

  ngOnInit() {
    const gameOver = this._gameService.game.gameOverObservable;
    gameOver
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
