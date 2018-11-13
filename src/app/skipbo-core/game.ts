import { Card, generateSkipBoCards } from './card';
import { Deck } from './deck';
import { DoublyLinkedList, DoublyLinkedListNode } from './doubly-linked-list';
import { logger } from './logger';
import { BuildingPile } from './pile/building-pile';
import { PileGroup } from './pile/pile-group';
import { Player } from './player';
import { assert } from './utils';
import { Observable, of, Subject, merge } from 'rxjs';
import { map, mergeMap, switchMap, filter, first } from 'rxjs/operators';

export const STOCK_CARD_COUNT_SMALL_GAME = 30;
export const STOCK_CARD_COUNT_LARGE_GAME = 20;

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 6;

export class Game {
  public buildingGroup: PileGroup<BuildingPile>;
  private _completedCards: Card[] = [];
  private _players: DoublyLinkedList<Player> = new DoublyLinkedList();

  private _deck: Deck;
  private _started: boolean = false;

  private _currentPlayer: DoublyLinkedListNode<Player>;
  private _turnCounter = 0;

  private readonly _gameOver: Subject<any> = new Subject();

  constructor(cards: Card[] = null) {
    this._deck = new Deck(cards || generateSkipBoCards());
    this.createBuildingPiles();
  }

  get completedCards(): Card[] {
    return [...this._completedCards];
  }

  get started() {
    return this._started;
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
    this.buildingGroup = new PileGroup<BuildingPile>();
    this.buildingGroup.add(new BuildingPile());
    this.buildingGroup.add(new BuildingPile());
    this.buildingGroup.add(new BuildingPile());
    this.buildingGroup.add(new BuildingPile());
  }

  createPlayer(name: string = null) {
    assert(this._players.size() < MAX_PLAYERS, `Maximum of ${MAX_PLAYERS} players reached`);

    const player = new Player(name || `Player ${this.players.length + 1}`, this);
    logger.info(`Added player '${player}'`);
    this._players.add(player);
    return player;
  }

  enableLogging() {
    logger.enable();
  }

  get winnerChanges() {
    return merge(...this.players.map(player => player.winnerChange));
  }

  susbcribeForWinner() {
    this._gameOver.subscribe(() => {
      console.log('game over, winner found');
    });

    this.winnerChanges.pipe(first()).subscribe(this._gameOver);

    // of(this.players)
    // .pipe(
    //   mergeMap(player => player), // transform tghe array into a stream of its items
    //   mergeMap(player => {
    //     // ensure that only real winners (true) are coming in
    //     return player.winner
    //       .pipe(filter(result => result === true));
    //   }, player => player), // look for the winner  stream
    //   first()
    // )
    // .subscribe((player: Player) => {
    //   console.log('player won', player);
    //   this.winner = player;
    //   // this.gameOver();
    // });
  }

  start() {
    logger.info('Start Game');

    assert(this.players.length >= MIN_PLAYERS, `You need at least ${MIN_PLAYERS} players to play`);
    assert(this._started === false, 'The game is already running');

    this.susbcribeForWinner();
    this._started = true;
    this.players[0].checkWinner();

    this.deck.shuffle();
    this.dealStockCards();
    this.nextPlayer();
  }

  getStockCardCount() {
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
      logger.info(`${player} received ${player.stock.count} stock cards`);
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
