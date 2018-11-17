import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BuildingPile } from 'src/app/skipbo-core/pile/building-pile';
import { PileGroup } from 'src/app/skipbo-core/pile/pile-group';
import { PileGroupComponent } from '../pile-group/pile-group.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { CardZone } from 'src/app/shared/card-zone';
import { GameService } from '../../services/game.service';

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
    console.log({cardDrop});
    if (cardDrop.source === 'hand') {
      this._gameService.game.currentPlayer.placeHandCard(cardDrop.cardValue, pile);
    }

    if (cardDrop.source === 'stock') {
      // cardDrop.cardValue
      this._gameService.game.currentPlayer.placeStockCard(pile);
    }

    console.log('cardDrop.source', cardDrop.source);
    if (cardDrop.source === 'discardGroup') {
      // cardDrop.cardValue
      this._gameService.game.currentPlayer.placeDiscardCard(cardDrop.cardValue, pile);
    }
    // this._gameService.game.currentPlayer.placeDiscardCard(card, pile);
    // this._gameService.game.currentPlayer.placeStockCard(pile);
  }



  constructor(private _gameService: GameService) { }
}
