import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'skipbo-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  constructor(
    private _gameService: GameService,
    private _playerService: PlayerService
  ) {
    if (this._gameService.players.length === 0) {
      this._gameService.createPlayer('You');
    }
  }

  addPlayer() {
    this._playerService.addPlayerCPU();
  }

  removePlayer() {
    this._gameService.removePlayer();
  }

  get playerCount() {
    return this._gameService.players.length;
  }

  get canPlay() {
    return this._gameService.players.length > 1;
  }
}
