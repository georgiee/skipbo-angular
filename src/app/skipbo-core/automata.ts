import { Game } from './game';
import { Player } from './player';
import { logger } from './logger';

type IAction = () => boolean;

export class Automata {
  private _gameOver = false;
  private _turnCounter = 0;
  private _cardPlayed = false;
  constructor(
    private game: Game
  ) {

  }

  run() {
    if (!this.game.started) {
      this.game.start();
    }

    const runner = () => {
      this.nextPlayer();

      if (this.game.gameOver) {
        console.log(`automata completed after ${this._turnCounter} turn`);
      } else {
        setTimeout(() => runner(), 1);
      }
    };

    runner();
  }

  nextPlayer() {
    if (!this.player.playing) {
      this.game.nextPlayer();
    }

    this.playTurn();
  }

  playTurn() {
    logger.groupCollapsed('Automata Playing Turn');
    this._turnCounter++;

    const player = this.game.currentPlayer;
    player.takeTurn();

    while (this.singleStep()) {
      logger.info('current step was successful');
    }

    if (player.isWinner()) {
      logger.info('completed');
    } else {
      player.discardHandCard();
      logger.info('no more cards to play, discarding');

    }

    logger.groupEnd('Automata Playing Turn');
  }

  singleStep() {
    if (this.game.currentPlayer.isWinner()) {
      throw new Error('Game is already over');
    }

    let cardPlayed = false;
    const actions: IAction[] = [this.tryStockCard, this.tryHandCard, this.tryDiscardPile];

    while (actions.length && !cardPlayed) {
      const action = actions.shift();
      cardPlayed = action.call(this);
    }

    return cardPlayed && !this.player.isWinner();
  }

  get player(): Player {
    return this.game.currentPlayer;
  }

  tryStockCard(): boolean {
    try {
      this.player.placeStockCard();
    } catch (error) {
      console.log('tryStockCard failed', error.message);
      return false;
    }

    return true;
  }

  tryHandCard(): boolean {
    try {
      this.player.placeHandCard();
    } catch (error) {
      console.log('tryHandCard failed', error.message);
      return false;
    }

    return true;
  }

  tryDiscardPile(): boolean {
    try {
      this.player.placeDiscardCard();
    } catch (error) {
      console.log('tryDiscardPile failed', error.message);
      return false;
    }

    return true;
  }
}
