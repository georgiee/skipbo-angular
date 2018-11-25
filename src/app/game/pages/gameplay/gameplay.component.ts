import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildingPile, Deck, PileGroup, Player } from 'skipbo-core';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { takeUntil } from 'rxjs/operators';
import { delay } from 'q';
import { Subject, merge } from 'rxjs';

@Component({
  selector: 'skipbo-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss']
})
export class GameplayComponent implements OnDestroy, OnInit {
  public buildingGroup: PileGroup<BuildingPile>;
  public opponentPlayers: Player[] = [];
  public player: Player;
  public deck: Deck;

  _destroyed$ = new Subject();

  constructor(
    private _gameService: GameService,
    private _playerService: PlayerService,
    private _router: Router
  ) {
    this._gameService.enableLogging();
    this.buildingGroup = this._gameService.building;
    this.deck = this._gameService.deck;
  }

  ngOnInit(): void {
    this.initPlayers();
    this.start();

    merge(this._gameService.gameAbort$, this._gameService.gameOver$)
      .pipe(
        takeUntil(this._destroyed$)
      ).subscribe(() => {
        this._router.navigateByUrl('/game/gameover');
      });
  }

  ngOnDestroy(): void {
    this._gameService.stop();
    this._destroyed$.next();
  }

  playTurn() {
    this._gameService.ai.playTurn();
  }

  initPlayers() {
    if (this._playerService.playerCount === 0) {
      this._playerService.addHumanPlayer();
      this._playerService.addPlayerCPU('Player 1');
      this._playerService.addPlayerCPU('Player 2');
    }

    this.opponentPlayers = this._playerService.getPlayers({cpu: true});
    const humanPlayer = this._playerService.getPlayers({cpu: false});
    this.player = humanPlayer[0];
  }

  start() {
    if (!this._gameService.started) {
      this._gameService.start();
    }
  }

  get currentPlayer() {
    return this._playerService.currentPlayer;
  }

  canUserLeave() {
    return this._gameService.game.gameOver;
  }

  playStock() {
    this._playerService.placeStockCard();
  }

  playHand() {
    this._playerService.placeHandCard();
  }

  playDiscard() {
    this._playerService.placeDiscardCard();
  }

  discardHand() {
    this._playerService.discardHandCard();
  }
}
