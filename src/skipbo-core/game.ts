import { Card, generateSkipBoCards } from './card';
import { Deck } from './deck';
import { DoublyLinkedList, DoublyLinkedListNode } from './doubly-linked-list';
import { logger } from './logger';
import { BuildingPile } from './pile/building-pile';
import { PileGroup } from './pile/pile-group';
import { Player, PlayerOptions } from './player';
import { assert } from './utils';
import { Observable, of, Subject, merge } from 'rxjs';
import { map, mergeMap, switchMap, filter, first, takeUntil } from 'rxjs/operators';

export const STOCK_CARD_COUNT_SMALL_GAME = 30;
export const STOCK_CARD_COUNT_LARGE_GAME = 20;

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 6;

const defaultOptions = {
  stockCardCount: null,
  shuffle: true
};
export class Game {
  public buildingGroup: PileGroup<BuildingPile>;
  private _completedCards: Card[] = [];
  private _players: DoublyLinkedList<Player> = new DoublyLinkedList();

  private _deck: Deck;
  private _started: boolean = false;

  private _currentPlayer: DoublyLinkedListNode<Player>;
  private _turnCounter = 0;
  private _gameOver = false;
  private _winner: Player;
  private _nextTurn: Subject<any> = new Subject<any>();
  readonly _gameOverSubject: Subject<any> = new Subject();
  private _customStockCardCount = null;

  constructor(cards: Card[] = null, options: any = {}) {
    options = {...defaultOptions, ...options};
    this._customStockCardCount = options.stockCardCount;
    this._deck = new Deck(cards || generateSkipBoCards(), options.shuffle);

    this.createBuildingPiles();
  }
  public get nextTurn() {
    return this._nextTurn.asObservable();
  }
  reset() {
    this._players.reset();
    this._winner = null;
    this._started = false;
    this._gameOver = false;
    this._turnCounter = 0;
    this._currentPlayer = null;
    this._completedCards = [];

    this.deck.reset();
    this.buildingGroup.reset();
  }

  get completedCards(): Card[] {
    return [...this._completedCards];
  }

  get winner(): Player {
    return this._winner;
  }

  get gameOver() {
    return this._gameOver;
  }

  get gameOverObservable() {
    return this._gameOverSubject.asObservable();
  }

  get started() {
    return this._started;
  }

  // remove all full building piles
  clearBuildingPiles() {
    const cards = this.buildingGroup.cleanup();

    if (cards.length > 0) {
      logger.info('Cleaned up piles');
    }
    this.addCompletedCards(...cards);
  }

  addCompletedCards(...cards: Card[]) {
    this._completedCards = this._completedCards.concat(cards);
  }

  mergeCompletedCards() {
    logger.info('Merging completed cards back into the deck');

    // add back cards from the completed deck and shuffle
    this._deck.add(...this._completedCards);
    this._deck.shuffle();

    this._completedCards = [];
  }

  createBuildingPiles() {
    this.buildingGroup = new PileGroup<BuildingPile>('buildingGroup');
    this.buildingGroup.add(new BuildingPile(1));
    this.buildingGroup.add(new BuildingPile(2));
    this.buildingGroup.add(new BuildingPile(3));
    this.buildingGroup.add(new BuildingPile(4));
  }

  removePlayer() {
    const player = this._players.pop() as Player;
    logger.info('Removed player', player.toString());
    return player;
  }

  createPlayer(name: string = null, options: PlayerOptions = {}) {
    assert(this._players.size() < MAX_PLAYERS, `Maximum of ${MAX_PLAYERS} players reached`);

    const player = new Player(name || `Player ${this.players.length + 1}`, this, options);
    logger.info(`Added player '${player}'`);
    this._players.add(player);

    player.turnCompleted.subscribe(() => {
      this.nextPlayer();
    });

    return player;
  }

  enableLogging() {
    logger.enable();
  }

  get winnerChanges() {
    return merge(...this.players.map(player => player.winnerChange));
  }

  susbcribeForWinner() {
    this._gameOverSubject.subscribe(() => {
      this._gameOver = true;
      this._winner = this.players.find(player => player.isWinner());
    });

    this.winnerChanges.pipe().subscribe(this._gameOverSubject);
  }

  start() {
    logger.info('Start Game');

    assert(this.players.length >= MIN_PLAYERS, `You need at least ${MIN_PLAYERS} players to play`);
    assert(this._started === false, 'The game is already running');
    assert(this._gameOver === false, 'The game is already completed');

    this.susbcribeForWinner();
    this._started = true;
    this.players[0].checkWinner();

    this.deck.shuffle();
    this.dealStockCards();
    this.nextPlayer();
  }

  getStockCardCount() {
    if (this._customStockCardCount) {
      return this._customStockCardCount;
    }

    if (this._players.size() < 5) {
      return STOCK_CARD_COUNT_SMALL_GAME;
    }

    return STOCK_CARD_COUNT_LARGE_GAME;
  }

  get currentPlayer(): Player {
    if (!this._started || !this._currentPlayer) {
      return null;
    }

    // assert(this._started, 'Game did not start yet');
    return this._currentPlayer.value;
  }

  nextPlayer() {
    assert(this._started, 'Game did not start yet');

    if (this.currentPlayer) {
      assert(this.currentPlayer.playing === false, 'Player not finished');
    }

    if (!this._currentPlayer) {
      this._currentPlayer = this._players.head;
    } else {
      if (this._currentPlayer.next) {
        this._currentPlayer = this._currentPlayer.next;
      } else {
        this._currentPlayer = this._players.head;
      }
    }

    this._turnCounter++;
    this.currentPlayer.takeTurn();
    this._nextTurn.next(this.currentPlayer);

    return this.currentPlayer;
  }

  dealStockCards() {
    const players = Array.from(this._players.values());
    const count = this.getStockCardCount();

    // we can't draw the full set, result wouldn't be interleaved
    // like it should when you give a card to alternating players.

    for (let i = 0; i < count; i++) {
      players.forEach(player => player.stock.add(...this.deck.draw()));
    }

    logger.group('Dealing stock cards to players');

    players.forEach(player => {
      logger.info(`'${player}' received ${player.stock.count} stock cards`);
    });

    logger.groupEnd();
  }

  get deck() {
    return this._deck;
  }

  get players() {
    return Array.from(this._players.values());
  }

  get turnId() {
    return this._turnCounter;
  }
}
