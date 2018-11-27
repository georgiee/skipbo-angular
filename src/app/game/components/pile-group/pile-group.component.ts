import { Component, Input, AfterViewInit, QueryList, ViewChildren, EventEmitter } from '@angular/core';
import { BuildingPile, DiscardPile, PileGroup } from 'skipbo-core';
import { AbstractCardZone } from '../../shared/abstract-card-zone';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { CardPileComponent } from '../card-pile/card-pile.component';
import { CardDrop } from '../../shared/card-drop';

@Component({
  selector: 'skipbo-pile-group',
  templateUrl: './pile-group.component.html',
  styleUrls: ['./pile-group.component.scss'],
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['allowDrop', 'canDragItemsToZones', 'sourceName', 'allowedSources'],
  // tslint:disable-next-line:use-output-property-decorator
  outputs: ['cardDropped']
})
export class PileGroupComponent extends AbstractCardZone implements AfterViewInit {
  private _group: PileGroup<DiscardPile|BuildingPile>;
  private _dropzones: CdkDropList[] = [];

  @ViewChildren(CardPileComponent) piles: QueryList<CardPileComponent>;

  @Input()
  set group(value: PileGroup<DiscardPile|BuildingPile>) {
    if (value) {
      this._group = value;
    }
  }
  get group() {
    return this._group;
  }


  getDropzones() {
    return this._dropzones;
  }

  ngAfterViewInit() {
    // this.piles.changes.subscribe((value) => {
    //   this._dropzones = this.piles.toArray().map(pile => pile.getDropzones());
    // });

    // wait a tick, dropzones has already been verified
    setTimeout(() => {
      this._dropzones = this.piles.toArray().map(pile => pile.getDropzones()[0]);
    });
  }



  handleCardDropped(cardDrop: CardDrop, pile: DiscardPile|BuildingPile) {
    // add the given pile (skipbo-core) so we now where to place the card
    cardDrop.pile = pile;
    this.cardDropped.next(cardDrop);
  }
}
