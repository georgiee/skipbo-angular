import { Deck } from './deck';
import { Card } from './card';

describe('Deck', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = new Deck([Card.One, Card.Two]);
  });

  it('is empty by default', () => {
    deck = new Deck();
    expect(deck.count).toBe(0);
  });

  it('can receive a default set', () => {
    expect(deck.count).toBe(2);
  });

  it('can add cards', () => {
    deck.add(Card.One, Card.Two);
    expect(deck.count).toBe(4);
  });

  it('check for empty', () => {
    expect(deck.empty()).toBeFalsy();
    const cards = deck.draw(2);
    expect(deck.empty()).toBeTruthy();
  });

  it('can peek next card without changing', () => {
    const card = deck.peek();
    expect(card).toBe(Card.Two);
    expect(deck.count).toBe(2);
  });

  it('can draw a card', () => {
    const [card] = deck.draw();
    expect(card).toBe(Card.Two);

    expect(deck.count).toBe(1);
  });

  it('can draw multiple cards', () => {
    const cards = deck.draw(2);
    expect(cards).toEqual([Card.Two, Card.One]);
    expect(deck.count).toBe(0);
  });

  it('cards can be shuffled', () => {
    expect(deck.shuffle).toBeTruthy();
  });
});
