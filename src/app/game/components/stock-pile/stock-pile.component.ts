import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Card } from 'skipbo-core';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { PileComponent } from '../pile/pile.component';

@Component({
  selector: 'skipbo-stock-pile',
  templateUrl: './stock-pile.component.html',
  styleUrls: ['./stock-pile.component.scss']
})
export class StockPileComponent implements OnInit {
  @ViewChild('pile') pile: PileComponent;

  @Input() cards: Card[] = [];
  @Input() sourceDropzones: CdkDropList[] = [];
  @Input() canDragItemsToZones: CdkDropList<any>[];


  constructor() { }

  ngOnInit() {
  }

}
