import { TestBed } from '@angular/core/testing';
import { PlayerService } from 'src/app/game/services/player.service';


describe('PlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerService = TestBed.get(PlayerService);
    expect(service).toBeTruthy();
  });
});
