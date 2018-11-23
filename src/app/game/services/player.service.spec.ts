import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';
import { GameService } from './game.service';

describe('PlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GameService
    ]
  }));

  it('should be created', () => {
    const service: PlayerService = TestBed.get(PlayerService);
    expect(service).toBeTruthy();
  });


  describe('PlayerService (Workshop)', () => {
    let service: PlayerService;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.get(PlayerService);
    });
  });

});
