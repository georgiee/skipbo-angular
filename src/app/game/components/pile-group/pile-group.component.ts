import { Component, OnInit, Input, ViewChildren, QueryList, AfterContentInit, AfterViewInit } from '@angular/core';
import { Card } from 'skipbo-core';
import { PileGroup } from 'src/app/skipbo-core/pile/pile-group';
import { DiscardPile } from 'src/app/skipbo-core/pile/discard-pile';
import { AbstractPile } from 'src/app/skipbo-core/pile/pile-abstract';
import { BuildingPile } from 'src/app/skipbo-core/pile/building-pile';
import { padArray } from 'src/app/utils';
import { PileComponent } from '../pile/pile.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { CardZone } from 'src/app/shared/card-zone';

@Component({
  selector: 'skipbo-pile-group',
  templateUrl: './pile-group.component.html',
  styleUrls: ['./pile-group.component.scss']
})
export class PileGroupComponent implements OnInit, AfterViewInit, CardZone {

  private _group: PileGroup<DiscardPile|BuildingPile>;
  private _dropzones: CdkDropList[] = [];
  @ViewChildren(PileComponent) piles: QueryList<PileComponent>;

  @Input() canDragItemsToZones: CdkDropList<any>[];
  @Input() public size = 4;

  getDropzones(): CdkDropList[] {
    return this._dropzones;
  }


  @Input()
  set group(value: PileGroup<DiscardPile|BuildingPile>) {
    if (value) {
      this._group = value;
    }
  }
  get group() {
    return this._group;
  }

  constructor() { }
  ngAfterViewInit() {
    // this.piles.changes.subscribe((value) => {
    //   this._dropzones = this.piles.toArray().map(pile => pile.getDropzones());
    // });

    // wait a tick, dropzones has already been verified
    setTimeout(() => {
      this._dropzones = this.piles.toArray().map(pile => pile.getDropzones()[0]);
    })
  }

  ngOnInit() {
  }

}
