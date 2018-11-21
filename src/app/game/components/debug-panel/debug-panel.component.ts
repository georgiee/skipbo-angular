import { Component, OnInit, HostBinding, HostListener, ElementRef } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from 'skipbo-core';
import { Automata } from 'skipbo-core';

import { ENTER, RIGHT_ARROW } from '@angular/cdk/keycodes';
@Component({
  selector: 'skipbo-debug-panel',
  templateUrl: './debug-panel.component.html',
  styleUrls: ['./debug-panel.component.scss']
})
export class DebugPanelComponent implements OnInit {
  game: Game;
  automata: Automata;
  opened = false;

  constructor(gameService: GameService) {
    this.game = gameService.game;
    this.automata = gameService.automata;
  }
  ngOnInit() {
  }

  gameover() {
    this.game._gameOverSubject.next();
  }

  autorun() {
    this.automata.autorun();
    this.toggle(); // auto collapse to see everything
  }

  playCurrentRound() {
    this.automata.playTurnSync();
  }

  toggle() {
    this.opened = !this.opened;
  }
}
