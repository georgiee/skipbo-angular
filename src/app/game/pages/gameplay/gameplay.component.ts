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

    this.player = this._gameService.game.createPlayer('You');
    const playerB = this._gameService.game.createPlayer('Player 2');

    this.opponentPlayers = [playerB];
    this.buildingGroup = this._gameService.game.buildingGroup;

    this.deck = this._gameService.game.deck;

    this.start();
  }

  start() {
    this._gameService.game.start();
  }
}
