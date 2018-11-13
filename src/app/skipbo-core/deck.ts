import { Card } from './card';
import { shuffle, assert } from './utils';

export class Deck {
  private _cards: Card[];

  constructor(cards: Card[] = []) {
    this._cards = [...cards];
  }

  shuffle() {
    this._cards = shuffle(this._cards);
  }

  add(...cards: Card[]) {
    this._cards = this._cards.concat(cards);
  }

  peek() {
    return this.top;
  }

  empty() {
    return this.count === 0;
  }

  canDraw(count: number) {
    return count <= this.count;
  }

  draw(count: number = 1): Card[] {
    assert(count > 0, `[Stock] Can't draw less than one card`);
    assert(this.canDraw(count), `[Stock] Deck not big enough (${this.count}), can\'t draw (${count}) card`);

    const cards = [];
    while (cards.length < count) {
      cards.push(this.drawSingleCard());
    }
    return cards;
  }

  drawSingleCard() {
    return this._cards.pop();
  }

  get count() {
    return this._cards.length;
  }

  get top(): Card {
    if (this.count === 0) {
      return Card.Empty;
    }
    return this._cards[this._cards.length - 1];
  }
}
