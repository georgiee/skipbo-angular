import { Component } from '@angular/core';
import { PileGroup } from 'src/app/skipbo-core/pile/pile-group';
import { Player } from 'skipbo-core';
import { Deck } from 'src/app/skipbo-core/deck';
import { BuildingPile } from 'src/app/skipbo-core/pile/building-pile';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

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
    private _router: Router
  ) {
    this._gameService.enableLogging();
    this.buildingGroup = this._gameService.buildingGroup;
    this.deck = this._gameService.deck;

    this.initPlayers();
    this.start();
  }

  initPlayers() {
    this.player = this._gameService.createPlayer('You');
    const playerCPU1 = this._gameService.createPlayer('Player 2', { cpu: true });
    const playerCPU2 = this._gameService.createPlayer('Player 3', { cpu: true });
    this.opponentPlayers = [ playerCPU1, playerCPU2 ];
  }

  start() {
    this._gameService.start();
  }
}
