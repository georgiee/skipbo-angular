import { Injectable } from '@angular/core';
import { Card, DiscardPile, BuildingPile, Game, Player } from 'skipbo-core';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _game: Game;

  constructor(
    private _gameService: GameService
  ) {
    this._game = _gameService.game;
  }

  get playerCount() {
    return this._game.players.length;
  }

  addPlayerCPU(name: string = null) {
    return this._game.createPlayer(name, { cpu: true });
  }

  addHumanPlayer(name: string = null) {
    return this._game.createPlayer(name, { cpu: false });
  }

  removePlayer() {
    this._game.removePlayer();
  }

  getPlayers({cpu = false}) {
    return this._game.players.filter(player => player.cpu === cpu);
  }

  get currentPlayer(): Player {
    return this._game.currentPlayer;
  }

  discardHandCard(card: Card, pile: DiscardPile) {
    this.currentPlayer.discardHandCard(card, pile);
  }

  placeHandCard(card: Card, pile: BuildingPile) {
    this.currentPlayer.placeHandCard(card, pile);
  }

  placeStockCard(pile: BuildingPile) {
    this.currentPlayer.placeStockCard(pile);
  }

  placeDiscardCard(card: Card, pile: BuildingPile) {
    this.currentPlayer.placeDiscardCard(card, pile);
  }
}
