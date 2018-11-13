import { Card } from '../card';
import { assert } from '../utils';
import { AbstractPile } from './pile-abstract';

export enum PileRole {
  BUILDING = 1,
  DISCARDING
}

export class BuildingPile extends AbstractPile {
  constructor() {
    super(PileRole.BUILDING);
  }

  isFull() {
    return this.top === Card.Twelve;
  }

  canDraw(card: Card) {
    return false;
  }

  canClear(): boolean {
    return this.top === Card.Twelve;
  }

  canPlace(candidate: Card): boolean {
    assert(this.isFull() === false, `You can't place card on a full pile`);
    const topCard = this.top;

    if (candidate === Card.SkipBo || candidate === Card.Empty) {
      return true;
    }

    return candidate - topCard === 1;
  }

  drawCards(...card: Card[]) {
    assert(false, `You can't remove card from building piles`);
    return null;
  }
}
