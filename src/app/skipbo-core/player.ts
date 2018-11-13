import { Game } from './game';
import { DiscardPile } from './pile/discard-pile';
import { PileGroup } from './pile/pile-group';
import { Hand } from './hand';
import { Deck } from './deck';
import { logger } from './logger';
import { Card } from './card';
import { assert } from './utils';
import { BuildingPile } from './pile/building-pile';
import { Subject, Observable } from 'rxjs';

export const HAND_CARD_COUNT = 5;

const HAND_LIMIT = 5;

export class Player {
  discardGroup: PileGroup<DiscardPile> = new PileGroup();
  private _hand: Hand = new Hand(HAND_LIMIT);
  private _stock: Deck = new Deck();
  private _playing = false;
  private _turns = 0;
  private _winnerSubject: Subject<Player> = new Subject();

  constructor(private _name: string, private _game: Game = null) {
    this.buildDiscardPiles();
  }

  takeTurn() {
    this._playing = true;
    this._turns++;
    this.fillHand();
    // this.checkWinner();
  }

  placeHandCard(card: Card = null, buildingPile: BuildingPile = null) {
    assert(this.playing, `Can't play if it's not your turn`);

    // This methods can auto select card and destination building pile
    // If a specific pile is the target, and a
    assert(this.hand.count > 0, `You have no hand cards left`);

    if (card && buildingPile) {
      assert(buildingPile.canPlace(card), `The card ${card} can't be placed in the selected building pile`);
      buildingPile.placeCards(this.drawHandCard(card, { refill: true }));
    } else {
      // It makes no sense to specify only the target pile
      assert(!buildingPile, `You can't specify a target pile and not give a card to place`);

      const candidates = this.game.buildingGroup.getBuildingCards(this.hand.cards);
      const anAnyHandPlaced = candidates.length > 0;
      assert(anAnyHandPlaced, `No card in your hand can be placed in the building group`);

      if (!card) {
        // naive approach: just play the first possible candidate of your hand
        card = candidates[0];
      }
      this.game.buildingGroup.autoPlace(this.drawHandCard(card, { refill: true }));
    }
  }

  placeStockCard(buildingPile: BuildingPile = null) {
    assert(this.playing, `Can't play if it's not your turn`);

    const card = this.stock.top;

    assert(card, `Card '${card}' is not valid`);
    assert(this.stock.canDraw(card), `Can't draw stock card ${card}, it's not the current card`);

    if (buildingPile) {
      assert(buildingPile.canPlace(card), `Can't place card ${card} on the chosen building pile`);
      const [stockCard] = this.stock.draw();
      buildingPile.placeCards(stockCard);
    } else {
      assert(this.game.buildingGroup.canPlace(card), `Can't place card ${card} on any building pile`);
      const [stockCard] = this.stock.draw();
      this.game.buildingGroup.autoPlace(stockCard);
    }

    this.checkWinner();
  }

  get winnerChange() {
    return this._winnerSubject.asObservable();
  }

  checkWinner() {
    if (this.isWinner()) {
      logger.info(`Player ${this} has won`);
      this._winnerSubject.next(this);
      this._winnerSubject.complete();
    }
  }

  isWinner(): boolean {
    return this.stock.count === 0 && this._turns > 0;
  }

  placeDiscardCard(card: Card = null, pile: BuildingPile = null) {
    assert(this.playing, `Can't play if it's not your turn`);

    const cards = this.discardGroup.getTopCards();
    assert(cards.length > 0, `There are no cards in the discard group`);

    const placeableCards = cards.filter(item => this.game.buildingGroup.canPlace(item));
    assert(placeableCards.length > 0, `[Discard Pile] No cards from the discard pile can be drawn`);

    if (!card) {
      // place the first possible card
      card = placeableCards[0];
    }

    assert(cards.indexOf(card) !== -1, `[Discard Pile] Card ${card} can't be drawn from any pile!`);

    assert(placeableCards.indexOf(card) !== -1, `[Discard Pile] Card ${card} can't be placed!`);
    assert(this.discardGroup.canDraw(card), `[Discard Pile] Card ${card} can't be drawn from any pile!`);

    const [drawnCard] = this.discardGroup.drawCard(card);
    this.game.buildingGroup.autoPlace(drawnCard);
  }

  discardHandCard(card: Card = null, pile: DiscardPile = null) {
    assert(this.playing, `Can't play if it's not your turn`);
    assert(this.hand.count > 0, ` You have no hand cards to discard`);

    if (!card) {
      card = this.hand.cards[0];
    }

    assert(card, `Card '${card}' is not valid`);
    assert(this.hand.hasCard(card), `Can't discard card ${card}, it's not on your hand`);
    const cardDrawn = this.drawHandCard(card);

    if (pile) {
      pile.placeCards(cardDrawn);
    } else {
      this.discardGroup.autoPlace(cardDrawn);
    }

    this.completeTurn();
  }

  get playing(): boolean {
    return this._playing;
  }

  get game(): Game {
    return this._game;
  }

  get hand(): Hand {
    return this._hand;
  }

  get stock(): Deck {
    return this._stock;
  }

  get name(): string {
    return this._name;
  }

  fillHand() {
    const delta = HAND_CARD_COUNT - this.hand.count;
    logger.info(`Drawing ${delta} cards`);

    if (delta === 0) {
      // nothing to do
      return;
    }

    if (!this._game.deck.canDraw(delta)) {
      // shuffle completed decks back in
      this._game.mergeCompletedCards();
    }

    this.hand.add(...this._game.deck.draw(delta));
  }

  protected drawHandCard(card, options: { refill: boolean } = { refill: false }) {
    const drawnCard = this.hand.draw(card);

    if (this.hand.count === 0 && options.refill) {
      this.fillHand();
    }

    return drawnCard;
  }

  buildDiscardPiles() {
    this.discardGroup.add(new DiscardPile());
    this.discardGroup.add(new DiscardPile());
    this.discardGroup.add(new DiscardPile());
    this.discardGroup.add(new DiscardPile());
  }

  toString() {
    return this.name;
  }

  protected completeTurn() {
    this._playing = false;
  }
}
