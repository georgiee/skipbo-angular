import { Hand } from './hand';
import { Card } from './card';
let hand: Hand;

beforeEach(() => {
  hand = new Hand();
});

describe('Hand Cards', () => {
  it('is empty by default', () => {
    expect(hand.count).toBe(0);
  });

  it('has a loimot', () => {
    expect(hand.limit).toBe(5);
  });

  it('can add cards', () => {
    expect(hand.count).toBe(0);
    hand.add(Card.One);
    expect(hand.count).toBe(1);
  });

  it('can read all cards', () => {
    hand.add(Card.One);
    hand.add(Card.Two);
    expect(hand.cards).toEqual([Card.One, Card.Two]);
  });

  it('can draw any card', () => {
    hand.add(Card.One, Card.Two, Card.Three, Card.Three);
    hand.draw(Card.One);
    hand.draw(Card.Three);

    expect(hand.count).toBe(2);
    expect(hand.hasCard(Card.Three)).toBeTruthy();
    expect(hand.hasCard(Card.Two)).toBeTruthy();
  });

  it('check if card is on hand', () => {
    hand.add(Card.One, Card.Two, Card.Three, Card.Three);

    expect(hand.hasCard(Card.Three)).toBeTruthy();
    expect(hand.hasCard(Card.Twelve)).toBeFalsy();
  });

  it(`can't add more than the limit of the hand`, () => {
    expect(hand.count).toBe(0);
    hand.add(Card.One, Card.One, Card.One, Card.One, Card.One);

    expect(() => {
      hand.add(Card.One);
    }).toThrowError();
  });
});
