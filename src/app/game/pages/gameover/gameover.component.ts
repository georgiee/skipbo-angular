import { Component, OnInit } from '@angular/core';
import { Player } from 'skipbo-core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'skipbo-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent {

  winner: Player;

  constructor(
    private _gameService: GameService
  ) {
    this.winner = this._gameService.game.winner;
    this.winner = new Player('My Player');
  }

}
