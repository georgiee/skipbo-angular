import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Card } from 'skipbo-core';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { PileComponent } from '../pile/pile.component';
import { CardZone } from 'src/app/shared/card-zone';

@Component({
  selector: 'skipbo-stock-pile',
  templateUrl: './stock-pile.component.html',
  styleUrls: ['./stock-pile.component.scss']
})
export class StockPileComponent implements OnInit, CardZone {
  @ViewChild('pile') pile: PileComponent;

  @Input() cards: Card[] = [];
  @Input() sourceDropzones: CdkDropList[] = [];
  @Input() canDragItemsToZones: CdkDropList<any>[];

  getDropzones(): CdkDropList<any>[] {
    return this.pile.getDropzones();
  }

  constructor() { }

  ngOnInit() {
  }

}
