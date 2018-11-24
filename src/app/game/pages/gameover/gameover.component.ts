import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'skipbo-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent implements OnInit {
  winner$;

  constructor(
    private _gameService: GameService
  ) { }

  ngOnInit() {
    this.winner$ = this._gameService.winner$;
    this._gameService.reset();
  }

  get winnerName(): string {
    return 'Player Unknown';
  }

}
