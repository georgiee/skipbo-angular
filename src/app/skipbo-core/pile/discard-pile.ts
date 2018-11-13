import { AbstractPile, PileRole } from './pile-abstract';
import { Card } from '../card';

export class DiscardPile extends AbstractPile {
  constructor() {
    super(PileRole.DISCARDING);
  }

  isFull() {
    return false;
  }

  canDraw(card: Card) {
    return this.top === card;
  }

  canPlace(candidate: Card): boolean {
    // We can always place a card on discarding
    return true;
  }

  canClear(): boolean {
    return false;
  }
}
