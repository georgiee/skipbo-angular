import { interleaveArrays } from './utils';
import { generateSkipBoCards } from './card';
import { Game } from './game';

// Create a deck we know so we can test it properly
const remainingDeck = Array.from(Array(102)).map(() => -1);
const stockCardsPlayer1 = [-1, 5, ...Array.from(Array(28)).map(() => -1)];
const stockCardsPlayer2 = [-1, 2, ...Array.from(Array(28)).map(() => -1)];

export function getStockCardsPlayer1() {
  return [...stockCardsPlayer1].reverse();
}

export function getStockCardsPlayer2() {
  return stockCardsPlayer2;
}

export function getRemainingDeck() {
  return remainingDeck;
}

export function getFailingDeck() {
  // if you use the default set unshuffled you will run out of cards
  return generateSkipBoCards();
}

export function getFullTestDeck() {
  // return testdeckLegacy
  const stockCards = interleaveArrays(getStockCardsPlayer1(), stockCardsPlayer2).reverse();

  return [...remainingDeck, ...stockCards];
}

export function getTwoPlayerTestGame() {
  // return testdeckLegacy
  // const cardsPlayer1 = [1, 5, 2, 3, 4, 5];
  const cardsPlayer1 = [1,2,3,4,5,6,7,8,9,10,11,12,5,5,5];
  const cardsPlayer2 = [...cardsPlayer1];

  const stockCards = interleaveArrays(cardsPlayer1.reverse(), cardsPlayer2.reverse()).reverse();
  const firstDandcards = [-1,-1,-1,-1,-1,5,5,5,5,5].reverse();
  const remaining = Array.from(Array(250)).map(() => -1);

  const game = new Game([...remaining, ...firstDandcards, ...stockCards], {stockCardCount: cardsPlayer1.length, shuffle: false});


  return game;
}


export function gerateSkipboOnlyGameTwoPlayers(stockCount = 30) {
  const deckSize = 100;
 // Create a deck we know so we can test it properly
  const stockPlayer1 = [...Array.from(Array(stockCount)).map(() => -1)];
  const stockPlayer2 = [...Array.from(Array(stockCount)).map(() => -1)];
  const deck = Array.from(Array(deckSize)).map(() => -1);

  const stockCards = interleaveArrays(stockPlayer1.reverse(), stockPlayer2.reverse()).reverse();
  const game = new Game([...deck, ...stockCards], {stockCardCount: stockCount, shuffle: false});

  return game;
}


function generateCards(value, amount) {
  return Array.from(Array(amount)).map(() => value);
}

export function generateGameThreePlayers() {
 // Create a deck we know so we can test it properly
  const stockPlayerHuman = [1, 2, -1, 5, 6];
  const stockPlayer2 = [2, 4, 7, 9, 12];
  const stockPlayer3 = [7, 9, 12, 2, 4];

  // const deck = Array.from(Array(deckSize)).map(() => -1);
  const deck = [4, 7, -1, 12, 11, 2, 5, 8, 9, 10, 11, -1, ...generateCards(-1, 100)].reverse();

  const stockCards = interleaveArrays(
    stockPlayerHuman.reverse(),
    stockPlayer2.reverse(),
    stockPlayer3.reverse()
  ).reverse();

  const game = new Game([...deck, ...stockCards], {stockCardCount: 5, shuffle: false});

  return game;
}
