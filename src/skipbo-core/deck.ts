import { Card } from './card';
import { shuffle, assert } from './utils';

export class Deck {
  private _cards: Card[];
  private _canShuffle = true;
  private _starterSet: Card[];

  constructor(cards: Card[] = [], canShuffle = true) {
    this._cards = [...cards];
    this._starterSet = [...cards];
    this._canShuffle = canShuffle;
  }

  public get cards() {
    return this._cards;
  }

  reset() {
    this._cards = [...this._starterSet];
  }

  shuffle() {
    if (!this._canShuffle) {
      return;
    }
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

  hasCardsCountLeft(count: number) {
    return count <= this.count;
  }

  canDraw(card: Card) {
    return card === this.top;
  }

  draw(count: number = 1): Card[] {
    assert(count > 0, `[Stock] Can't draw less than one card`);
    assert(this.hasCardsCountLeft(count), `[Stock] Deck not big enough (${this.count}), can\'t draw (${count}) card`);

    const cards = [];
    while (cards.length < count) {
      cards.push(this.drawSingleCard());
    }

    return cards;
  }

  drawSingleCard() {
    const card = this._cards.pop();
    this._cards = [...this._cards];

    return card;
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
