import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player, Card } from 'skipbo-core';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { PlayerService } from '../../services/player.service';

const HAND_SIZE = 5;

@Component({
  selector: 'skipbo-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.have-turn]': 'player.playing'
  }
})
export class PlayerComponent {
  handSize = HAND_SIZE;
  @Input() player: Player;

  @Input() buildingZones: CdkDropList[] = [];

  @Output() discard: EventEmitter<any> = new EventEmitter();
  @Output() playDiscard: EventEmitter<any> = new EventEmitter();
  @Output() stock: EventEmitter<any> = new EventEmitter();
  @Output() hand: EventEmitter<any> = new EventEmitter();
  @Output() autoTurn: EventEmitter<any> = new EventEmitter();

  constructor(
    private _playerService: PlayerService
  ) { }

  getHandCard(index) {
    const {hand} = this.player;

    if ( index < hand.count) {
      return hand.cards[index];
    }
    return Card.Empty;
  }


  mergeZones(...list) {
    return list.reduce((acc, item) => [...acc, ...item], []);
  }

  handleDiscardedCard(cardDrop) {
    if (cardDrop.source === 'hand') {
      this._playerService.discardHandCard(cardDrop.cardValue, cardDrop.pile);
    }
  }
}
