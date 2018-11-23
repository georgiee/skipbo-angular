import { Component } from '@angular/core';
import { GameService } from './game/services/game.service';

@Component({
  selector: 'skipbo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'skipbo';
  constructor(
    public gameService: GameService
  ) {
  }
}
