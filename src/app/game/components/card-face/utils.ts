import { Card } from 'skipbo-core';

function parseCardFace(input: any) {
  let valueParsed = null;

  // try to match a number
  valueParsed = parseInt(input, 10);

  // if it's not a number try to find a known literal `back` & `skipbo`
  if (!valueParsed && typeof input === 'string') {
    valueParsed = cardLiteralToValue(input);
  }

  if (valueParsed) {
    return valueParsed;
  }

  return null;
}

function cardLiteralToValue(value) {
  switch (value) {
    case 'back': return Card.Back;
    case 'skipbo': return Card.SkipBo;
    default: return  Card.Empty;
  }
}

function cardToFace(card) {
  if (card === null) {
    return 'none';
  }

  if (card === Card.SkipBo) {
    return 'skipbo';
  }

  if (card === Card.Back) {
    return 'back';
  }

  return card;
}


export {
  parseCardFace,
  cardToFace
};
