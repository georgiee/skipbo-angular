import { PileRole } from './pile-abstract';
import { Card } from '../card';
import { BuildingPile } from './building-pile';
import { createFullPile } from './spec-utils';

let pile: BuildingPile;

describe('Building Pile', () => {
  beforeEach(() => {
    pile = new BuildingPile();
  });

  it('role is building pile', () => {
    expect(pile.role).toBe(PileRole.BUILDING);
  });

  it(`can't remove any card`, () => {
    pile.placeCards(Card.One, Card.Two, Card.Three);

    expect(() => {
      pile.drawCards(Card.Three);
    }).toThrowError(`You can't remove card from building piles`);
  });

  it('can place Card.ONE when empty', () => {
    expect(pile.canPlace(Card.One)).toBeTruthy();
  });

  it(`can't place random ordered card on building pile`, () => {
    pile.placeCards(Card.One);

    expect(() => {
      pile.placeCards(Card.Three);
    }).toThrowError(`Can't place card 3`);
  });

  it('is not full when empty', () => {
    expect(pile.isFull()).toBeFalsy();
  });

  it('is full when 12 is the top card', () => {
    pile.placeCards(...createFullPile());
    expect(pile.isFull()).toBeTruthy();
  });

  it('throws an error if you try to place a card on a full pile', () => {
    pile.placeCards(...createFullPile());

    expect(() => {
      pile.placeCards(Card.SkipBo);
    }).toThrowError(`You can't place card on a full pile`);
  });

  it('Can only be cleared when full', () => {
    pile.placeCards(Card.One, Card.Two);

    expect(() => {
      const cards = pile.clear();
    }).toThrowError();
  });

  it('Can be cleared', () => {
    pile.placeCards(...createFullPile());
    const cards = pile.clear();

    expect(pile.size).toBe(0);
  });
});
