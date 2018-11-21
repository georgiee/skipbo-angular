import { CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input, ViewChild } from '@angular/core';
import { CardZone } from 'src/app/shared/card-zone';
import { BuildingPile } from 'skipbo-core';
import { PileGroup } from 'skipbo-core';
import { PlayerService } from '../../services/player.service';
import { PileGroupComponent } from '../pile-group/pile-group.component';

@Component({
  selector: 'skipbo-building-group',
  templateUrl: './building-group.component.html',
  styleUrls: ['./building-group.component.scss']
})
export class BuildingGroupComponent implements CardZone {
  private _group: PileGroup<BuildingPile>;

  @Input()
  set group(value: PileGroup<BuildingPile>) {
    this._group = value;
  }
  get group() {
    return this._group;
  }

  @ViewChild('piles') piles: PileGroupComponent;

  @Input() canDragItemsToZones: CdkDropList<any>[];


  getDropzones(): CdkDropList[] {
    return this.piles.getDropzones();
  }

  handleCardDroppedInPile({cardDrop, pile}) {
    const player = this._playerService;

    if (cardDrop.source === 'hand') {
      player.placeHandCard(cardDrop.cardValue, pile);
    }

    if (cardDrop.source === 'stock') {
      player.placeStockCard(pile);
    }

    if (cardDrop.source === 'discardGroup') {
      player.placeDiscardCard(cardDrop.cardValue, pile);
    }
  }

  constructor(
    private _playerService: PlayerService
  ) { }
}
