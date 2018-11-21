import { Component, OnInit } from '@angular/core';
import { Card } from 'skipbo-core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'skipbo-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss']
})
export class GameplayComponent implements OnInit {
  get deck() {
    return this.gameService.deck;
  }

  get building() {
    return this.gameService.building;
  }

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
  }

  backToDeck() {
    this.gameService.backToDeck();
  }

  buildCard() {
    this.gameService.buildFromDeck();
  }
}
