import { interleaveArrays } from './utils';
import { generateSkipBoCards } from './card';

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
