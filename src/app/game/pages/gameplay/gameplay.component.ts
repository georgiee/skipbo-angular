import { Component, OnInit } from '@angular/core';
import { Card } from 'skipbo-core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'skipbo-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss']
})
export class GameplayComponent implements OnInit {

  constructor(
    private gameService: GameService
  ) {
  }

  ngOnInit() {
    // start the game here
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
  }
}
