import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { GameModule } from '../game.module';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ GameModule ]
  }));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });
});
