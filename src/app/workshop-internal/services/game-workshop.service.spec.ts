import { TestBed } from '@angular/core/testing';
import { GameService } from 'src/app/game/services/game.service';


describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });
});
