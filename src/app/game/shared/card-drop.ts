import { Card, AbstractPile, DiscardPile, BuildingPile } from 'skipbo-core';

export interface CardDrop {
  source: string;
  cardValue: Card;
  pile?: DiscardPile|BuildingPile;
}
