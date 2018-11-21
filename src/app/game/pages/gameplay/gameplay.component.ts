import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuildingPile, Deck, PileGroup, Player } from 'skipbo-core';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'skipbo-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss']
})
export class GameplayComponent {
  public buildingGroup: PileGroup<BuildingPile>;
  public opponentPlayers: Player[] = [];

  public player: Player;
  public deck: Deck;

  constructor(
    private _gameService: GameService,
    private _playerService: PlayerService,
    private _router: Router
  ) {
    this._gameService.enableLogging();
    this.buildingGroup = this._gameService.buildingGroup;
    this.deck = this._gameService.deck;

    this.initPlayers();
    this.start();
  }

  initPlayers() {
    if (this._gameService.players.length === 0) {
      this._playerService.addHumanPlayer();
      this._playerService.addPlayerCPU('Player 1');
      this._playerService.addPlayerCPU('Player 2');
    }

    this.opponentPlayers = this._playerService.getPlayers({cpu: true});
    const humanPlayer = this._playerService.getPlayers({cpu: false});
    this.player = humanPlayer[0];
  }

  start() {
    this._gameService.start();
  }
}
