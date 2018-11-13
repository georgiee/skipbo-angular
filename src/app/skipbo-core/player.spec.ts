import { Player, HAND_CARD_COUNT } from './player';
import { Game } from './game';
import { getFullTestDeck } from './testdeck';
import { Card } from './card';
import { BuildingPile } from './pile/building-pile';

let player: Player;
let game: Game;

const createPlayer = (name, givenGame: Game = null) => {
  return new Player(name, givenGame);
};

describe('Player', () => {
  beforeEach(() => {
    player = new Player('Player 1');
  });

  it('has a name', () => {
    expect(player.name).toBe('Player 1');
  });

  it('has a discard group of 4 piles', () => {
    expect(player.discardGroup.count).toBe(4);
  });

  it('has hand cards', () => {
    expect(player.hand).toBeTruthy();
  });

  it('has hand cards with limit of 5', () => {
    expect(player.hand.limit).toBe(5);
  });

  it('has stock cards', () => {
    expect(player.stock).toBeTruthy();
  });

  it('toString resolves to name', () => {
    expect(player.toString()).toEqual('Player 1');
  });

  describe('Hand Cards', () => {
    let game: Game;

    // our deck should have skipbo at the top
    const testset = () =>
      [
        Card.SkipBo,
        Card.One,
        Card.Two,
        Card.Three,
        Card.Four,
        Card.Four,
        Card.Four,
        Card.Four,
        Card.Four,
        Card.Four
      ].reverse();

    beforeEach(() => {
      game = new Game(testset());
      player = createPlayer('Player 1', game);
    });

    it('has reference to game', () => {
      expect(player.game).toBe(game);
    });

    it('fills up hand from deck', () => {
      game = new Game(testset());
      player = createPlayer('Player 1', game);
      player.fillHand();

      expect(player.hand.cards.length).toBe(HAND_CARD_COUNT);
      expect(player.hand.cards).toEqual([Card.SkipBo, Card.One, Card.Two, Card.Three, Card.Four]);
    });

    it('fills up only difference', () => {
      player.fillHand();

      player.hand.draw(Card.SkipBo);
      player.hand.draw(Card.One);

      expect(player.hand.count).toBe(3);

      player.fillHand();

      expect(player.hand.cards.length).toBe(HAND_CARD_COUNT);
      expect(player.hand.cards).toEqual([Card.Two, Card.Three, Card.Four, Card.Four, Card.Four]);
    });

    it('multiple fills are ignore', () => {
      player.fillHand();
      player.fillHand();
      expect(player.hand.cards.length).toBe(HAND_CARD_COUNT);
    });

    it('fills will trigger a merge of completed cards', () => {
      game = new Game([]);
      player = createPlayer('Player', game);

      const spyMerge = spyOn(game, 'mergeCompletedCards').and.callThrough();

      game.addCompletedCards(Card.One, Card.One, Card.One, Card.One, Card.One);
      player.fillHand();

      expect(spyMerge).toHaveBeenCalled();
    });

    it('can discard a hand card', () => {
      player.takeTurn();

      const handCardsBefore = player.hand.cards;
      player.discardHandCard(handCardsBefore[0]);

      const handCardsAfter = player.hand.cards;
      expect(handCardsBefore.length - 1).toBe(handCardsAfter.length);
    });

    it('can discard a hand card to a specific discard pile', () => {
      player.takeTurn();

      const firstDiscardPile = player.discardGroup.getPiles()[0];
      player.discardHandCard(player.hand.cards[0], firstDiscardPile);

      expect(firstDiscardPile.getCardValues().length).toBe(1);
    });

    it('can auto place the first hand card that can be placed', () => {
      // [Card.SkipBo, Card.One, Card.Two, Card.Three, Card.Four]
      player.takeTurn();
      player.placeHandCard();

      // SKipBo will be placed
      expect(player.hand.cards).toEqual([Card.One, Card.Two, Card.Three, Card.Four]);
    });

    it('can place a specific hand card', () => {
      // [Card.SkipBo, Card.One, Card.Two, Card.Three, Card.Four]
      player.takeTurn();
      player.placeHandCard(Card.One);

      expect(player.hand.cards).toEqual([Card.SkipBo, Card.Two, Card.Three, Card.Four]);
    });

    it('Error when you have no hand cards', () => {
      // [Card.SkipBo, Card.One, Card.Two, Card.Three, Card.Four]
      // do nothing to get an empty hand

      player.fillHand = () => {};
      player.takeTurn();

      expect(() => {
        player.placeHandCard(Card.One);
      }).toThrowError('You have no hand cards left');
    });

    it('Error when you try to automatically place a card in a specified building pile', () => {
      // [Card.SkipBo, Card.One, Card.Two, Card.Three, Card.Four]

      player.takeTurn();
      const firstPile = game.buildingGroup.getPiles()[0];

      expect(() => {
        player.placeHandCard(null, firstPile);
      }).toThrowError(`You can't specify a target pile and not give a card to place`);
    });

    it('Error when you nothing can be placed', () => {
      game = new Game([Card.Twelve, Card.Twelve, Card.Twelve, Card.Twelve, Card.Twelve]);
      player = createPlayer('Player 1', game);

      player.takeTurn();
      const firstPile = game.buildingGroup.getPiles()[0];

      expect(() => {
        player.placeHandCard();
      }).toThrowError(`No card in your hand can be placed in the building group`);
    });

    // it('is complete when no stock cars are left', () => {
    //   player.addStockCard(Card.Twelve, Card.Eleven, Card.Ten);
    //   expect(player.complete).toBeFalsy();
    // });
  });

  describe('Stock Cards', () => {
    let player2: Player;

    const testset = [Card.SkipBo, Card.One, Card.Two, Card.Three, Card.Four];

    beforeEach(() => {
      game = new Game(testset);
      player = game.createPlayer('Player 1');
      player2 = game.createPlayer('Player 2');
    });

    it('can place a stock card', () => {
      game = new Game(getFullTestDeck());
      player = game.createPlayer('Player 1');
      player2 = game.createPlayer('Player 2');

      // disabled shuffling
      game.deck.shuffle = () => {};
      game.start();

      // top stock card in the testdeck is Card.SkipBo which can be placed
      player.placeStockCard();

      // autoPlace of the group will select first pile in this case
      const firstPile = game.buildingGroup.getPiles()[0];

      const cards = firstPile.getCardValues();
      expect(cards).toEqual([Card.One]);
    });

    it('can place a stock card ion a specific pile', () => {
      game = new Game(getFullTestDeck());
      player = game.createPlayer('Player 1');
      player2 = game.createPlayer('Player 2');

      // disabled shuffling
      game.deck.shuffle = () => {};
      game.start();

      const firstPile = game.buildingGroup.getPiles()[0];

      // top stock card in the testdeck is Card.SkipBo which can be placed
      player.placeStockCard(firstPile);

      const cards = firstPile.getCardValues();
      expect(cards).toEqual([Card.One]);
    });
  });

  describe('Place Discard Card', () => {
    const testset = [Card.SkipBo, Card.One, Card.Two, Card.Three, Card.Four];
    let firstDiscardPile: BuildingPile;
    let firstBuildingPile: BuildingPile;
    let secondDiscardPile: BuildingPile;

    beforeEach(() => {
      game = new Game(testset);
      player = game.createPlayer('Player 1');

      firstBuildingPile = game.buildingGroup.getPiles()[0];

      firstDiscardPile = player.discardGroup.getPiles()[0];
      firstDiscardPile.placeCards(Card.Twelve);
      firstDiscardPile.placeCards(Card.One);

      secondDiscardPile = player.discardGroup.getPiles()[1];
      secondDiscardPile.placeCards(Card.Twelve);
    });

    it('can play a discard card', () => {
      player.takeTurn();
      player.placeDiscardCard(Card.One);
    });

    it('can auto play a card to discard', () => {
      player.takeTurn();
      player.placeDiscardCard();
      expect(firstDiscardPile.getCardValues()).toEqual([Card.Twelve]);
      expect(firstBuildingPile.getCardValues()).toEqual([Card.One]);
    });

    it('error when there are no discarded carcds', () => {
      const player2 = game.createPlayer('Player 1');
      player2.takeTurn();

      expect(() => {
        player2.placeDiscardCard(Card.One);
      }).toThrowError('There are no cards in the discard group');
    });

    it(`error when card can't be drawn from the discard pile`, () => {
      expect(() => {
        player.takeTurn();
        player.placeDiscardCard(Card.Four);
      }).toThrowError(`[Discard Pile] Card 4 can't be drawn from any pile!`);
    });

    it('error when nothing can be placed', () => {
      player.takeTurn();
      expect(() => {
        player.placeDiscardCard(Card.Twelve);
      }).toThrowError(`[Discard Pile] Card 12 can't be placed!`);
    });
  });

  describe('Turn', () => {
    beforeEach(() => {
      game = new Game();
      player = game.createPlayer('Player 1');
    });

    it('player is not a winner when game never started', () => {
      expect(player.isWinner()).toBe(false);
    });

    it('player is winner when all stock cards are played', () => {
      // second player so wen can start playing
      game.createPlayer('Player 2');
      game.start();

      // remove all stock cards
      player.stock.draw(30);
      expect(player.isWinner()).toBe(true);
    });

    it('notify about winning after placing the last stock card', () => {
      game = new Game(getFullTestDeck());
      // second player so wen can start playing
      player = game.createPlayer('Player 1');

      let playerHasWon = false;
      player.winnerChange.subscribe(() => {
        playerHasWon = true;
      });

      game.createPlayer('Player 2');
      game.start();

      // remove all stock cards
      player.takeTurn();
      player.stock.draw(29);
      player.placeStockCard();

      expect(playerHasWon).toBe(true);
    });

    it('can start a turn', () => {
      expect(player.takeTurn).toBeTruthy();
    });

    it('playing is true when turn is active', () => {
      expect(player.playing).toBeFalsy();
      player.takeTurn();
      expect(player.playing).toBeTruthy();
    });

    it('complete turn by discarding a card', () => {
      player.takeTurn();
      player.discardHandCard();
      expect(player.playing).toBeFalsy();
    });

    it('fills hand when taking the turn', () => {
      const fillSpy = spyOn(player, 'fillHand').and.callThrough();
      player.takeTurn();
      expect(fillSpy).toHaveBeenCalled();
    });

    it('refills hand when empty after placing a hand card', () => {
      // draw only skipbo cards
      game.deck.drawSingleCard = () => Card.SkipBo;

      player.takeTurn();

      player.placeHandCard();
      player.placeHandCard();
      player.placeHandCard();
      player.placeHandCard();

      const fillSpy = spyOn(player, 'fillHand').and.callThrough();
      player.placeHandCard();
      expect(fillSpy).toHaveBeenCalled();
    });

    it('never refills when discard a hand csard', () => {
      // draw only skipbo cards
      game.deck.drawSingleCard = () => Card.SkipBo;

      player.takeTurn();

      player.placeHandCard();
      player.placeHandCard();
      player.placeHandCard();
      player.placeHandCard();

      const fillSpy = spyOn(player, 'fillHand').and.callThrough();
      player.discardHandCard();
      expect(fillSpy).not.toHaveBeenCalled();
    });

    it('error when trying to place stock card while not being the active player', () => {
      expect(() => {
        player.placeStockCard();
      }).toThrowError(`Can't play if it's not your turn`);
    });

    it('error when trying to place hand card while not being the active player', () => {
      expect(() => {
        player.placeHandCard();
      }).toThrowError(`Can't play if it's not your turn`);
    });

    it('error when trying to place discard card while not being the active player', () => {
      expect(() => {
        player.placeDiscardCard();
      }).toThrowError(`Can't play if it's not your turn`);
    });
  });
});
