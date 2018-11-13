import { BuildingPile } from './pile/building-pile';
import { Game, MAX_PLAYERS } from './game';
import { PileGroup } from './pile/pile-group';
import { Player } from './player';
import { Card } from './card';

let game: Game;

describe('Game', () => {
  beforeEach(() => {
    game = new Game();
  });

  it('has a building pile group', () => {
    expect(game.buildingGroup instanceof PileGroup).toBeTruthy();
  });

  it('has four building piles', () => {
    expect(game.buildingGroup.count).toBe(4);
  });

  it('creates player with reference to myself', () => {
    const player = game.createPlayer();
    expect(player.game).toBe(game);
  });

  describe('start', () => {
    let player1: Player;
    let player2: Player;

    beforeEach(() => {
      player1 = game.createPlayer();
      player2 = game.createPlayer();
    });

    it('can start a game', () => {
      expect(game.start).toBeTruthy();
    });

    it('throws error if started twic', () => {
      game.start();
      expect(() => {
        game.start();
      }).toThrowError();
    });

    xit('start shuffles deck', () => {
      const shuffleSpy = spyOn(game.deck, 'shuffle');
      game.start();

      expect(shuffleSpy).toHaveBeenCalled();
    });

    it('start calls dealStockCards', () => {
      const giveSpy = spyOn(game, 'dealStockCards');
      game.start();

      expect(giveSpy).toHaveBeenCalled();
    });

    it('start a game will give stock cards to all players', () => {
      game.start();

      expect(player1.stock.count).toBe(30);
      expect(player2.stock.count).toBe(30);
    });

    it('start a game will give only 20 stock cards when playing with 5 or more players', () => {
      // create 4 additional players
      game.createPlayer();
      game.createPlayer();
      game.createPlayer();
      game.createPlayer();

      // start and therefore deal stock cards to all players
      game.start();

      expect(player1.stock.count).toBe(20);
      expect(player2.stock.count).toBe(20);

      console.log(game.deck.count);
    });
  });

  it('has completed cards', () => {
    expect(game.completedCards).toBeTruthy();
  });

  it('completed cards are empty by default', () => {
    expect(game.completedCards.length).toBe(0);
  });

  it('can add completed cards', () => {
    game.addCompletedCards(Card.One, Card.Three, Card.Four);
    expect(game.completedCards.length).toBe(3);
  });

  it('mergeCompletedCards merges and shuffles completed cards from building piles', () => {
    game = new Game([]);
    const deckShuffle = spyOn(game.deck, 'shuffle');
    game.addCompletedCards(Card.One, Card.Three, Card.Four);
    game.mergeCompletedCards();

    expect(game.deck.count).toBe(3);
    expect(game.completedCards.length).toBe(0);

    expect(deckShuffle).toHaveBeenCalled();
  });

  describe('Deck', () => {
    it('has a card deck of 162 cards by default', () => {
      expect(game.deck.count).toBe(162);
    });

    it('can receive a custom set of cards', () => {
      game = new Game([Card.One, Card.Two]);
      expect(game.deck.count).toBe(2);
    });
  });

  describe('Player', () => {
    it('can create players', () => {
      const player = game.createPlayer('Player 1');
      expect(player instanceof Player).toBeTruthy();
    });

    it('can create the maximum of players', () => {
      for(let i = 0; i < MAX_PLAYERS; i++) {
        game.createPlayer();
      }
      expect(game.players.length).toBe(MAX_PLAYERS);
    });

    it('error when creating more than the maximum of players', () => {
      for(let i = 0; i < MAX_PLAYERS; i++) {
        game.createPlayer();
      }
      expect(() => {
        game.createPlayer();
      }).toThrowError('Maximum of 6 players reached');
    });

    it('collects created players', () => {
      game.createPlayer('Player 1');
      game.createPlayer('Player 2');

      expect(game.players.length).toBe(2);
    });

    it('return copy of player list to prevent modifications', () => {
      game.players.push(null);
      expect(game.players.length).toBe(0);
    });

    it('automatically name a new player if no name is given', () => {
      game.createPlayer('Some Player');
      game.createPlayer('Other Player');
      const player = game.createPlayer();

      expect(player.name).toBe('Player 3');
    });
  });

  describe('Player Turns', () => {
    let player1: Player;
    let player2: Player;

    beforeEach(() => {
      player1 = game.createPlayer('Player1');
      player2 = game.createPlayer('Player2');
      game.start();
    });

    it('returns null if game not started', () => {
      game = new Game();
      player1 = game.createPlayer('Player1');
      expect(game.currentPlayer).toBe(null);
    });

    it('throws error if current player is not finished', () => {
      expect(() => game.nextPlayer()).toThrowError('Player not finished');
    });

    it('returns a player', () => {
      expect(game.currentPlayer instanceof Player).toBeTruthy();
    });

    it('returns next player', () => {
      expect(game.currentPlayer).toBe(player1);
      game.currentPlayer.discardHandCard();

      game.nextPlayer(); // Player 2
      expect(game.currentPlayer).toBe(player2);
    });

    it('has a turn counter', () => {
      game.currentPlayer.discardHandCard();
      game.nextPlayer();

      game.currentPlayer.discardHandCard();
      game.nextPlayer();

      expect(game.turnId).toBe(3);
    });
  });
});
