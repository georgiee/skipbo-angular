import { PileRole } from './pile-abstract';
import { Card } from '../card';
import { DiscardPile } from './discard-pile';
import { createFullPile } from './spec-utils';

let pile: DiscardPile;

describe('Discard Pile', () => {
  beforeEach(() => {
    pile = new DiscardPile();
  });

  it('role returns building pile', () => {
    expect(pile.role).toBe(PileRole.DISCARDING);
  });

  it('is never full', () => {
    pile.placeCards(...createFullPile());
    expect(pile.isFull()).toBeFalsy();
  });

  it('can place any card in any order', () => {
    pile.placeCards(Card.Twelve, Card.Two, Card.SkipBo, Card.Four);
    expect(pile.top).toBe(Card.Four);
  });

  it('can draw the top card', () => {
    pile.placeCards(Card.Twelve, Card.Two, Card.SkipBo, Card.Four);

    const [card] = pile.drawCards(Card.Four);

    expect(card).toBe(Card.Four);
    expect(pile.top).toBe(Card.Three);
  });

  it(`Can't draw any other card than the top one`, () => {
    pile.placeCards(Card.Twelve, Card.Two, Card.SkipBo, Card.Four);

    expect(() => {
      pile.drawCards(Card.Two);
    }).toThrowError(`Can't draw card 2`);
  });

  it(`Can't be cleared`, () => {
    expect(() => {
      pile.clear();
    }).toThrowError(`This pile can't be cleared now`);
  });
});
