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
    private _playerService: PlayerService
  ) {
    this._gameService.enableLogging();
    this.buildingGroup = this._gameService.buildingGroup;
    this.deck = this._gameService.deck;

    this.initPlayers();
    this.start();
  }

  initPlayers() {
    this._playerService.addPlayerCPU();
    this.player = this._playerService.addHumanPlayer();
  }

  start() {
    this._gameService.start();
  }
}
