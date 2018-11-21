import { Component, OnInit, Input, HostBinding, ViewChild, AfterContentInit } from '@angular/core';
import { PileGroup } from 'skipbo-core';
import { DiscardPile } from 'skipbo-core';
import { PileGroupComponent } from '../pile-group/pile-group.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { CardZone } from 'src/app/shared/card-zone';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'skipbo-discard-group',
  templateUrl: './discard-group.component.html',
  styleUrls: ['./discard-group.component.scss']
})
export class DiscardGroupComponent implements CardZone {
  @ViewChild('piles') piles: PileGroupComponent;

  @Input() group: PileGroup<DiscardPile>;
  @Input() canDragItemsToZones: CdkDropList<any>[];
  @Input() allowDrop = false;

  getDropzones(): CdkDropList[] {
    return this.piles.getDropzones();
  }

  handleCardDroppedInPile({cardDrop, pile}) {
    if (cardDrop.source === 'hand') {
      this._playerService.discardHandCard(cardDrop.cardValue, pile);
    }
  }


  constructor(
    private _playerService: PlayerService
  ) { }
}
