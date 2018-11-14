import { Component, OnInit } from '@angular/core';
import { Player } from 'skipbo-core';
import { GameService } from '../game.service';
import { BuildingPile } from 'src/app/skipbo-core/pile/building-pile';
import { PileGroup } from 'src/app/skipbo-core/pile/pile-group';

@Component({
  selector: 'skipbo-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public buildingGroup: PileGroup<BuildingPile>;
  public opponentPlayers: Player[] = [];
  public player: Player;
  public deckCards = [];

  constructor(
    private _gameService: GameService
  ) {
    this._gameService.enableLogging();
    this.player = this._gameService.game.createPlayer('You');
    const playerB = this._gameService.game.createPlayer('Player 2');
    this.opponentPlayers = [playerB];
    this.buildingGroup = this._gameService.game.buildingGroup;

    this._gameService.game.start();
    // this.opponentPlayers = this._gameService.game.players;
  }

  ngOnInit() {
  }

}
