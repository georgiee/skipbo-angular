import { AbstractPile } from './pile-abstract';
import { Card } from '../card';
import { assert } from '../utils';

export enum PLACE_STRATEGY {
  FIRST,
  EVENLY
}

export class PileGroup<T extends AbstractPile> {
  _piles: T[] = [];
  _placeStrategy: PLACE_STRATEGY;

  constructor(placeStrategy: PLACE_STRATEGY = PLACE_STRATEGY.EVENLY) {
    this._placeStrategy = placeStrategy;
  }

  getPiles(): T[] {
    return this._piles;
  }

  get count() {
    return this._piles.length;
  }

  add(pile: T) {
    this._piles.push(pile);
  }

  getPileCandidates(card: Card): T[] {
    const candidates = this._piles.filter((pile: T) => pile.canPlace(card));

    return candidates;
  }

  canPlace(card: Card) {
    return this.getPileCandidates(card).length > 0;
  }

  getBuildingCards(cards: Card[]): Card[] {
    const candidateCards = cards.filter(card => this.canPlace(card));
    return candidateCards;
  }

  autoPlace(card: Card): T {
    assert(this.canPlace(card), `Can't auto-place this card with the current set of piles`);
    const candidates = this.getPileCandidates(card);
    const chosenPile: T = this.getTargetPile(candidates, this._placeStrategy);

    chosenPile.placeCards(card);

    return chosenPile;
  }

  autoPlaceCards(...cards: Card[]) {
    while (cards.length) {
      this.autoPlace(cards.shift());
    }
  }

  display() {
    const allCards = this._piles.map(pile => {
      return pile.getCardValues();
    });

    // calculate heighest stack
    const maxStackSize = allCards.reduce((size: number, item: Card[]) => Math.max(size, item.length), 0);

    const transpose = m =>
      Array.from(Array(maxStackSize)).map((x, i) =>
        m.map(item => {
          return item[i] === undefined ? '░' : item[i];
        })
      );

    let transposed = transpose(allCards);
    transposed = transposed.map(item => item.join('|'));

    return transposed.join('\n');
  }

  print(name) {
    console.group(name);
    console.log(this.display());
    console.groupEnd();
  }

  cleanup() {
    // remove all completed building piles
    const cards: Card[] = [];

    this._piles.forEach(pile => {
      if (pile.isFull()) {
        cards.push(...pile.clear());
      }
    });

    return cards;
  }

  getDrawCandidates(card: Card) {
    const candidates = this._piles.filter((pile: T) => pile.canDraw(card));

    return candidates;
  }

  canDraw(card: Card) {
    return this.getDrawCandidates(card).length > 0;
  }

  drawCard(card: Card) {
    const candidates = this.getDrawCandidates(card);
    assert(candidates.length > 0, `Card ${card} can't be drawn`);

    return candidates[0].drawCards(card);
  }

  getTopCards() {
    return this._piles.map(pile => pile.top).filter((card: Card) => card !== Card.Empty);
  }

  getTargetPile(candidates: T[], strategy: PLACE_STRATEGY): T {
    // naive, always take the first pile. We could also randomly choose or use the smallest pile first.
    switch (strategy) {
      case PLACE_STRATEGY.EVENLY:
        return this.smallestPile(candidates);
      case PLACE_STRATEGY.FIRST:
        return candidates[0];
    }

    throw new Error(`Given place strategy (${strategy}) is unknown`);
  }

  smallestPile(list: T[]) {
    const sortedList = list.sort((a: T, b: T) => a.size - b.size);
    return sortedList[0];
  }

  [Symbol.iterator]() {
    return this._piles.values();
  }
}
