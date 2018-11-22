import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';

describe('PlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

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

    it('should have a method discardHandCard', () => {
      expect(typeof service.discardHandCard).toBe('function');
    });

    it('should have a method placeHandCard', () => {
      expect(typeof service.placeHandCard).toBe('function');
    });

    it('should have a method placeStockCard', () => {
      expect(typeof service.placeStockCard).toBe('function');
    });

    it('should have a method placeDiscardCard', () => {
      expect(typeof service.placeDiscardCard).toBe('function');
    });

    it('should have a method addPlayerCPU', () => {
      expect(typeof service.addPlayerCPU).toBe('function');
    });

    it('should have a method getPlayers', () => {
      expect(typeof service.getPlayers).toBe('function');
    });

    it('should have a method addHumanPlayer', () => {
      expect(typeof service.addHumanPlayer).toBe('function');
    });
  });

});
