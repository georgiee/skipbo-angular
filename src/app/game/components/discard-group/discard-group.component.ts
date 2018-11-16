import { Component, OnInit, Input, HostBinding, ViewChild, AfterContentInit } from '@angular/core';
import { PileGroup } from 'src/app/skipbo-core/pile/pile-group';
import { DiscardPile } from 'src/app/skipbo-core/pile/discard-pile';
import { PileGroupComponent } from '../pile-group/pile-group.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { CardZone } from 'src/app/shared/card-zone';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'skipbo-discard-group',
  templateUrl: './discard-group.component.html',
  styleUrls: ['./discard-group.component.scss']
})
export class DiscardGroupComponent implements CardZone {

  @Input() group: PileGroup<DiscardPile>;
  @ViewChild('piles') piles: PileGroupComponent;

  @Input() canDragItemsToZones: CdkDropList<any>[];
  @Input() allowDrop = false;

  getDropzones(): CdkDropList[] {
    return this.piles.getDropzones();
  }

  handleCardDroppedInPile({cardDrop, pile}) {
    if (cardDrop.source === 'hand') {
      this._gameService.game.currentPlayer.discardHandCard(cardDrop.cardValue, pile);
    }
  }


  constructor(private _gameService: GameService) { }

}
