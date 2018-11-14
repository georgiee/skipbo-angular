import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from 'src/app/skipbo-core/game';

@Component({
  selector: 'skipbo-debug-panel',
  templateUrl: './debug-panel.component.html',
  styleUrls: ['./debug-panel.component.scss']
})
export class DebugPanelComponent implements OnInit {
  game: Game;

  constructor(gameService: GameService) {
    this.game = gameService.game;
  }

  ngOnInit() {
  }

}
