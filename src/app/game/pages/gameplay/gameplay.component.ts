import { Component, OnInit } from '@angular/core';
import { Card } from 'skipbo-core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'skipbo-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss']
})
export class GameplayComponent implements OnInit {
  private _gameOver = false;

  constructor(
    private gameService: GameService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.gameService.start();
    this._gameOver = false;
  }

  get started() {
    return this.gameService.started;
  }

  get deck() {
    return this.gameService.deck;
  }

  get building() {
    return this.gameService.building;
  }

  backToDeck() {
    this.gameService.backToDeck();
  }

  buildCard() {
    this.gameService.buildFromDeck();
    if (this.deck.length === 0) {
      this._gameOver = true;
      this.router.navigateByUrl('/game/gameover');
    }
  }

  canUserLeave() {
    return this._gameOver;
  }
}
