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
  //const cardsPlayer1 = [1, 5, 2, 3, 4, 5];
  const cardsPlayer1 = [1,2,3,4,5,6,7,8,9,10,11,12,5,5,5];
  const cardsPlayer2 = [...cardsPlayer1];

  const stockCards = interleaveArrays(cardsPlayer1.reverse(), cardsPlayer2.reverse()).reverse();
  const firstDandcards = [-1,-1,-1,-1,-1,5,5,5,5,5].reverse();
  const remaining = Array.from(Array(250)).map(() => -1);

  const game = new Game([...remaining, ...firstDandcards, ...stockCards], {stockCardCount: cardsPlayer1.length, shuffle: false});


  return game;
}
