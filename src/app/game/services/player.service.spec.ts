import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';
import { GameService } from './game.service';

describe('PlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GameService
    ]
  }));
});
