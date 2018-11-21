import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { Card } from 'skipbo-core';
import { BuildingPile } from 'skipbo-core';
import { DiscardPile } from 'skipbo-core';

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

  addPlayerCPU(name: string = null) {
    const player = this._gameService.createPlayer(name, { cpu: true });
    return player;
  }

  getPlayers({cpu = false}) {
    return this._gameService.players.filter(player => player.cpu === cpu);
  }

  addHumanPlayer(name: string = 'You') {
    const player = this._gameService.createPlayer(name, { cpu: false });
    return player;
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
