import { Card } from './card';
import { assert } from './utils';

export class Hand {
  private _cards: Card[] = [];

  constructor(private _handLimit: number = 5) {}

  get count() {
    return this._cards.length;
  }

  get limit() {
    return this._handLimit;
  }

  get cards() {
    return [...this._cards];
  }

  draw(card: Card): Card {
    assert(this.hasCard(card), `Card ${card} is not on your hand`);
    const handPosition = this._cards.indexOf(card);
    return this._cards.splice(handPosition, 1)[0];
  }

  hasCard(card: Card) {
    return this._cards.indexOf(card) > -1;
  }

  add(...cards: Card[]) {
    assert(
      this.count + cards.length <= this.limit,
      `You can't add more cards than the hand limit of ${this.limit} cards`
    );
    this._cards = this._cards.concat(cards);
  }
}
