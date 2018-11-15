import { Component, OnInit, HostBinding, HostListener, ElementRef } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from 'src/app/skipbo-core/game';
import { Automata } from 'src/app/skipbo-core/automata';

import { ENTER, RIGHT_ARROW } from '@angular/cdk/keycodes';
@Component({
  selector: 'skipbo-debug-panel',
  templateUrl: './debug-panel.component.html',
  styleUrls: ['./debug-panel.component.scss']
})
export class DebugPanelComponent implements OnInit {
  game: Game;
  automata: Automata;

  constructor(gameService: GameService) {
    this.game = gameService.game;
    this.automata = new Automata(this.game);
  }

  @HostListener('document:keypress', ['$event'])
  onKeydown(event) {
    if (event.key === 'n') {
      this.automata.singleStep();
    }
    if (event.keyCode === ENTER) {
      this.automata.nextPlayer();
    }
  }

  ngOnInit() {
  }

}
