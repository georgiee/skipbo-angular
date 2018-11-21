import { Automata } from './automata';
import { Game } from './game';
import { getFullTestDeck } from './testdeck';

let automata: Automata;
let game: Game;

describe('Automata', () => {
  beforeEach(() => {
    game = new Game(getFullTestDeck());
    game.createPlayer();
    game.createPlayer();
    automata = new Automata(game);
  });

  // xit('starts game if not started yet', () => {
  //   expect(game.started).toBeFalsy();
  //   automata.run();
  //   expect(game.started).toBeTruthy();
  // });

  // xdescribe('steps', () => {

  //   let tryStockCardSpy;
  //   let tryHandCardSpy;
  //   let tryDiscardPileSpy;

  //   beforeEach(() => {
  //     tryStockCardSpy = spyOn(automata, 'tryStockCard');
  //     tryHandCardSpy = spyOn(automata, 'tryHandCard');
  //     tryDiscardPileSpy = spyOn(automata, 'tryDiscardPile');

  //     game.start();
  //   });

  //   it('test all three possibilities if nothing works', () => {
  //     tryStockCardSpy = tryStockCardSpy.and.returnValue(false);
  //     tryHandCardSpy = tryHandCardSpy.and.returnValue(false);
  //     tryDiscardPileSpy = tryDiscardPileSpy.and.returnValue(false);
  //     automata.playerStep();

  //     expect(tryStockCardSpy).toHaveBeenCalled();
  //     expect(tryHandCardSpy).toHaveBeenCalled();
  //     expect(tryDiscardPileSpy).toHaveBeenCalled();
  //   });

  //   it('stop after tryStockCardSpy is true', () => {
  //     tryStockCardSpy = tryStockCardSpy.and.returnValue(true);
  //     tryHandCardSpy = tryHandCardSpy.and.returnValue(false);
  //     tryDiscardPileSpy = tryDiscardPileSpy.and.returnValue(false);

  //     automata.playerStep();

  //     expect(tryStockCardSpy).toHaveBeenCalled();
  //     expect(tryHandCardSpy).not.toHaveBeenCalled();
  //     expect(tryDiscardPileSpy).not.toHaveBeenCalled();
  //   });

  //   it('stop after tryHandCardSpy is true', () => {

  //     tryStockCardSpy = tryStockCardSpy.and.returnValue(false);
  //     tryHandCardSpy = tryHandCardSpy.and.returnValue(true);
  //     tryDiscardPileSpy = tryDiscardPileSpy.and.returnValue(false);

  //     automata.playerStep();

  //     expect(tryStockCardSpy).toHaveBeenCalled();
  //     expect(tryHandCardSpy).toHaveBeenCalled();
  //     expect(tryDiscardPileSpy).not.toHaveBeenCalled();
  //   });

  //   it('stop after tryStockCardSpy is true', () => {

  //     tryStockCardSpy = tryStockCardSpy.and.returnValue(false);
  //     tryHandCardSpy = tryHandCardSpy.and.returnValue(false);
  //     tryDiscardPileSpy = tryDiscardPileSpy.and.returnValue(true);

  //     automata.playerStep();

  //     expect(tryStockCardSpy).toHaveBeenCalled();
  //     expect(tryHandCardSpy).toHaveBeenCalled();
  //     expect(tryDiscardPileSpy).toHaveBeenCalled();
  //   });
  // });

});
