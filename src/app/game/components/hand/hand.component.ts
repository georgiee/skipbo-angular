import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Card } from 'skipbo-core';
import { padArray } from 'src/app/utils';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { CardZone } from 'src/app/shared/card-zone';

const NUMBER_CARDS = 5;

@Component({
  selector: 'skipbo-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements CardZone {
  @Input() cards: Card[] = [];
  @ViewChild('dropzone') _dropzone: CdkDropList;
  @Input() canDragItemsToZones: CdkDropList[] = [];

  getDropzones() {
    return [this._dropzone];
  }

  dropped() {
    console.log('dropped');
  }
}
