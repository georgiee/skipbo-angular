import { take, toArray } from 'rxjs/operators';
import { Card } from '../card';
import { AbstractPile, PileRole } from './pile-abstract';

class SimplePileImpl extends AbstractPile {
  constructor(role: PileRole = PileRole.BUILDING) {
    super(role);
  }
}

let pile: SimplePileImpl;

describe('Pile Abstract', () => {
  beforeEach(() => {
    pile = new SimplePileImpl(PileRole.BUILDING);
  });

  it('can read size of the pile', () => {
    expect(pile.size).toBe(0);
    pile.placeCards(Card.One);
    expect(pile.size).toBe(1);
  });

  it('is empty in the beginning', () => {
    expect(pile.size).toBe(0);
  });

  it('can have different roles', () => {
    const pileBuilding = new SimplePileImpl(PileRole.BUILDING);
    expect(pileBuilding.role).toBe(PileRole.BUILDING);

    const pileDiscard = new SimplePileImpl(PileRole.DISCARDING);
    expect(pileDiscard.role).toBe(PileRole.DISCARDING);
  });

  it('throw an error without a role', () => {
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new SimplePileImpl(null);
    }).toThrowError();
  });

  it('can read top card', () => {
    pile.placeCards(Card.One);
    expect(pile.top).toBe(Card.One);
  });

  it('top card is an empty card if pile is empty', () => {
    expect(pile.top).toBe(Card.Empty);
  });

  describe('place', () => {
    it('can place a card', () => {
      expect(pile.size).toBe(0);
      pile.placeCards(Card.One);
      expect(pile.size).toBe(1);
    });

    it('can place multiple cards', () => {
      pile.placeCards(Card.One, Card.Two, Card.Three);
      expect(pile.size).toBe(3);
    });

    it('place cards in order, last one on top', () => {
      pile.placeCards(Card.One, Card.Two, Card.Three);
      expect(pile.getCardValues()).toEqual([Card.One, Card.Two, Card.Three]);
      expect(pile.top).toBe(Card.Three);
    });

    it('place checks if card can be placed', () => {
      const canPlaceSpy = spyOn(pile, 'canPlace').and.returnValue(true);
      pile.placeCards(Card.One);

      expect(canPlaceSpy).toHaveBeenCalled();
    });

    it('throws error if cards is not placeable', () => {
      pile.canPlace = () => false;

      expect(() => {
        pile.placeCards(Card.One);
      }).toThrowError(`Can't place card 1`);
    });

    it('SkiPo cards (wild) are placed as the actual card values', () => {
      pile.placeCards(Card.One, Card.Two, Card.SkipBo);
      expect(pile.top).toBe(Card.Three);
    });

    it('emit cards being placed', () => {
      let cardsAdded: Card[];

      // no need for fakeAsync, we know that our observable is synchronous here.
      pile.cardAdded
        .pipe(
          take(3),
          toArray()
        )
        .subscribe(cards => {
          cardsAdded = cards;
        });

      pile.placeCards(Card.One);
      pile.placeCards(Card.Three);
      pile.placeCards(Card.Two);

      expect(cardsAdded).toEqual([Card.One, Card.Three, Card.Two]);
    });
  });

  describe('draw', () => {
    it('draw checks if top card is allowed to be drawn ', () => {
      const canDrawSpy = spyOn(pile, 'canDraw').and.returnValue(true);
      pile.drawCards(Card.One);

      expect(canDrawSpy).toHaveBeenCalled();
    });

    it('draw throws error if cards is not drawable', () => {
      // mock the (here) optimistic canDraw to always return false
      pile.canDraw = () => false;

      expect(() => {
        pile.drawCards(Card.One);
      }).toThrowError(`Can't draw card 1`);
    });

    it('can draw top card', () => {
      pile.placeCards(Card.One, Card.Two, Card.Four);
      pile.drawCards(Card.Four);

      expect(pile.getCardValues()).toEqual([Card.One, Card.Two]);
    });

    it('returns card being drawn', () => {
      pile.placeCards(Card.One);
      expect(pile.drawCards(Card.One)).toEqual([Card.One]);
    });

    it('drawing any other card than top is forbidden', () => {
      pile.placeCards(Card.One, Card.Two, Card.Four);

      expect(() => {
        pile.drawCards(Card.Two);
      }).toThrowError(`Can't draw card 2`);
    });

    it('emit cards being drawn', () => {
      let cardsRemoved: Card[];
      pile.placeCards(Card.One, Card.Two, Card.Three);

      // no need for fakeAsync, we know that our observable is synchronous here.
      pile.cardRemoved
        .pipe(
          take(3),
          toArray()
        )
        .subscribe(cards => {
          cardsRemoved = cards;
        });

      pile.drawCards(Card.Three, Card.Two, Card.One);

      expect(cardsRemoved).toEqual([Card.Three, Card.Two, Card.One]);
    });
  });

  it('emit stream of current cards', () => {
    let currentCards: Card[];

    pile.cards.subscribe(cards => {
      currentCards = cards;
    });

    pile.placeCards(Card.One, Card.Two, Card.Three);
    expect(currentCards).toEqual([Card.One, Card.Two, Card.Three]);

    pile.drawCards(Card.Three, Card.Two);
    expect(currentCards).toEqual([Card.One]);
  });

  it('can clear cards', () => {
    pile.placeCards(Card.One, Card.Two, Card.Four, Card.Twelve);
    pile.clear();
    expect(pile.size).toEqual(0);
  });
});
