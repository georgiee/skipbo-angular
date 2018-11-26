export function updateCards(component, newCards) {
  // save objects and mutate array instead of creating a new one 💪
  component._cards.length = 0;
  component._cards.push(...newCards);
}
