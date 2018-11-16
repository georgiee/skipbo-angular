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
  @Input() cards: Card[] = [];
  @Input() sourceDropzones: CdkDropList[] = [];
  @ViewChild('pile') pile: PileComponent;

  getDropzone(): CdkDropList {
    return this.pile.dropzone;
  }

  constructor() { }

  ngOnInit() {
  }

}
