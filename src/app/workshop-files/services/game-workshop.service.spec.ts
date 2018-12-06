import { TestBed } from '@angular/core/testing';
import { GameService } from 'src/app/game/services/game.service';
import { GameModule } from 'src/app/game/game.module';

interface GameServiceStub {
  deck: [];
  building: [];
  game: any;
  start: Function;
  reset: Function;
  end: Function;
}

let service: GameServiceStub;



const getDescriptor = (obj, name) => {
  return Object.getOwnPropertyDescriptor(obj.__proto__, name);
};

describe('GameService (Workshop)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameModule]
    });
    service = TestBed.get(GameService);
  });

  it('should have a getter deck', () => {
    expect(getDescriptor(service, 'deck')).toBeTruthy();
  });

  it('deck returns an empty array', () => {
    expect(Array.isArray(service.deck)).toBeTruthy();
    expect(service.deck.length).toBe(0);
  });

  it('should have a getter building', () => {
    expect(getDescriptor(service, 'building')).toBeTruthy();
  });

  it('building returns an empty array', () => {
    expect(Array.isArray(service.building)).toBeTruthy();
    expect(service.building.length).toBe(0);
  });

  it('should have a getter game', () => {
    expect(getDescriptor(service, 'game')).toBeTruthy();
  });

  it('game returns null', () => {
    expect(service.game).toBe(null);
  });

  it('should have a method start', () => {
    expect(typeof service.start).toBe('function');
  });

  it('should have a method reset', () => {
    expect(typeof service.reset).toBe('function');
  });


});
