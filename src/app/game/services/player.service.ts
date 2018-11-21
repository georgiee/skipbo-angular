import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { Card } from 'skipbo-core';
import { BuildingPile } from 'src/app/skipbo-core/pile/building-pile';
import { DiscardPile } from 'src/app/skipbo-core/pile/discard-pile';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private _gameService: GameService
  ) {

  }

  get player() {
    return this._gameService.currentPlayer;
  }

  discardHandCard(card: Card, pile: DiscardPile) {
    this.player.discardHandCard(card, pile);
  }

  placeHandCard(card: Card, pile: BuildingPile) {
    this.player.placeHandCard(card, pile);
  }

  placeStockCard(pile: BuildingPile) {
    this.player.placeStockCard(pile);
  }

  placeDiscardCard(card: Card, pile: BuildingPile) {
    this.player.placeDiscardCard(card, pile);
  }
}
