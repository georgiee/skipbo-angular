import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Card } from '../card';
import { DoublyLinkedList } from '../doubly-linked-list';
import { assert } from '../utils';

export enum PileRole {
  BUILDING = 1,
  DISCARDING
}

export abstract class AbstractPile {
  private _cardList: DoublyLinkedList<Card>;

  private _role: PileRole;
  private _cardAddedSubject: Subject<Card> = new Subject();
  private _cardRemovedSubject: Subject<Card> = new Subject();
  private _cardsSubject: Subject<Card[]> = new BehaviorSubject([]);

  public readonly cardAdded: Observable<Card> = this._cardAddedSubject.asObservable();
  public readonly cardRemoved: Observable<Card> = this._cardRemovedSubject.asObservable();
  public readonly _cardObservable: Observable<Card[]> = this._cardsSubject.asObservable();

  constructor(role: PileRole) {
    assert(role, 'You need to specify the role of this pile');
    this._role = role;
    this._cardList = new DoublyLinkedList([]);
  }

  public get cards() {
    return this._cardObservable;
  }

  public canDraw(card: Card): boolean {
    return this.top === card;
  }

  public canPlace(card: Card): boolean {
    return true;
  }

  public canClear(): boolean {
    return true;
  }

  public isFull(): boolean {
    return false;
  }

  public drawCards(...cards: Card[]) {
    const cardsDrawn = [];

    while (cards.length) {
      cardsDrawn.push(this.drawCard(cards.shift()));
    }

    return cardsDrawn;
  }

  public placeCards(...cards: Card[]) {
    while (cards.length) {
      this.placeCard(cards.shift());
    }
  }

  public clear(): Card[] {
    assert(this.canClear(), `This pile can't be cleared now`);
    const currentCards = this.getCardValues();

    while (currentCards.length) {
      this.remove(currentCards.pop());
    }

    return currentCards;
  }

  get role(): PileRole {
    return this._role;
  }

  getCardValues() {
    return Array.from(this._cardList.values());
  }

  get top(): Card {
    if (this._cardList.size() === 0) {
      return Card.Empty;
    }

    return this._cardList.tail.value;
  }

  get size(): number {
    return this._cardList.size();
  }

  protected drawCard(card: Card): Card {
    assert(this.canDraw(card), `Can't draw card ${card}`);
    return this.remove(card);
  }

  protected placeCard(card: Card) {
    assert(this.canPlace(card), `Can't place card ${card}`);

    if (card === Card.SkipBo) {
      // Never add SkipBo cards, replace with value it reflects (current card + 1)
      // this makes it much easier to handle the pile
      card = this.top + 1;
    }

    return this.add(card);
  }

  private remove(card: Card) {
    this._cardList.pop();
    this._cardRemovedSubject.next(card);
    this._cardsSubject.next(this.getCardValues());

    return card;
  }

  private add(card: Card) {
    this._cardList.add(card);
    this._cardAddedSubject.next(card);
    this._cardsSubject.next(this.getCardValues());

    return card;
  }

  [Symbol.iterator]() {
    return this._cardList.values();
  }
}
