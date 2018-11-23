import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { GameService } from '../../services/game.service';
import { Player } from 'skipbo-core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'skipbo-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  humanPlayerName: string = 'You';
  private _humanPlayer: Player;

  @ViewChild('playerNameForm') playerNameForm: NgForm;

  constructor(
    private _gameService: GameService,
    private _playerService: PlayerService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (this.playerCount === 0) {
      this._humanPlayer = this._playerService.addHumanPlayer(this.humanPlayerName);
    } else {
      this._humanPlayer = this._playerService.getPlayers({cpu: false})[0];
    }
  }

  addPlayer() {
    if (this.playerCount === 0) {
    } else {
      this._playerService.addPlayerCPU();
    }
  }

  removePlayer() {
    this._playerService.removePlayer();
  }

  start() {
    this._humanPlayer.name = this.humanPlayerName;
    this._gameService.start();
    // this._router.navigateByUrl('/game/gameplay');
  }

  canPlay() {
    return this._gameService.ready && this.playerNameForm.valid;
  }

  get playerCount() {
    return this._playerService.playerCount;
  }

}
