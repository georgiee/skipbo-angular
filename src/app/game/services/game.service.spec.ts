import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { GameModule } from '../game.module';

const getDescriptor = (obj, name) => {
  return Object.getOwnPropertyDescriptor(obj.__proto__, name);
};

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ GameModule ]
    });
  });
});


