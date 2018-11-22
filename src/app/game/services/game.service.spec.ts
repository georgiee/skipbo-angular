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

  describe('game', () => {
    let service: GameService;
    beforeEach(() => {
      service = TestBed.get(GameService);
      service.start();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should not mutate deck card list', () => {
      const deckBefore = service.deck;
      service.buildFromDeck();
      const deckAfter = service.deck;

      expect(deckBefore).not.toBe(deckAfter);
    });

    it('should not mutate build card list', () => {
      service.buildFromDeck();

      const buildingBefore = service.building;
      service.backToDeck();
      const buildingAfter = service.building;

      expect(buildingBefore).not.toBe(buildingAfter);
    });

  });

  describe('GameService (Workshop)', () => {
    let service: GameService;

    beforeEach(() => {
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

});


