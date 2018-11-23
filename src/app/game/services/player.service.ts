import { Injectable } from '@angular/core';
import { Card, DiscardPile, BuildingPile, Game, Player, Automata } from 'skipbo-core';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _game: Game;
  private _automata: Automata;

  constructor(
    private _gameService: GameService
  ) {
    this._game = _gameService.game;
    this._automata = _gameService.automata;
  }

  get playerCount() {
    return this._game.players.length;
  }

  addPlayerCPU(name: string = null) {
    return this._game.createPlayer(name, { cpu: true });
  }

  addHumanPlayer(name: string = 'You') {
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

  discardHandCard(card: Card = null, pile: DiscardPile = null) {
    this.currentPlayer.discardHandCard(card, pile);
  }

  placeHandCard(card: Card = null, pile: BuildingPile = null) {
    this.currentPlayer.placeHandCard(card, pile);
  }

  placeStockCard(pile: BuildingPile = null) {
    this.currentPlayer.placeStockCard(pile);
  }

  placeDiscardCard(card: Card = null, pile: BuildingPile = null) {
    this.currentPlayer.placeDiscardCard(card, pile);
  }

  autoplayTurn() {
    this._automata.playTurnSync();
  }
}
