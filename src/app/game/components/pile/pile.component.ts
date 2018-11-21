import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Card } from 'skipbo-core';
import { CardZone } from 'src/app/shared/card-zone';

const MAX_CARD_DISPLAY = 12;

@Component({
  selector: 'skipbo-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.scss'],
})
export class PileComponent implements OnInit, OnChanges {
  private _displayCount = 3;
  private _cards: Card[] = [];
  _stackCardsCount = 0;

  @ViewChild(CdkDropList) public _dropzone: CdkDropList;

  @Input() sourceName: string;
  @Input() allowedSources: string[] = [];
  _allowedSourcesCombined: string[] = [];

  @Input() autoRevealCard = false;
  @Input() canDragItemsToZones: CdkDropList[] = [];

  @Input()
  set cards (value: Card[]) {
    this._cards = value || [];
    // we only want to show the top card (otherwise people could cheat by peeking below)
    // displayCount can be used to adjust how many cards we want to show at max.
    this._stackCardsCount = Math.min(this._cards.length, this.displayCount) - 1;
  }
  get cards(): Card[] {
    return this._cards;
  }

  @Input()
  set displayCount(value) {
    this._displayCount = Math.max(value, MAX_CARD_DISPLAY);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.allowedSources || changes.sourceName) {
      let allowedSource = [];
      let sourceName = [];

      if (changes.allowedSources && changes.allowedSources.currentValue) {
        allowedSource = changes.allowedSources.currentValue || [];
      }

      if (changes.sourceName && changes.sourceName.currentValue) {
        sourceName = [changes.sourceName.currentValue];
      }

      // ensure that we always combine the explicit allowSource with the name of the parent group if any
      // otherwise we can't move inside a pile group
      // this is a very idiomatic solution — should ideally be handled with parent host injection or a service
      this._allowedSourcesCombined = [...allowedSource, ...sourceName];
    }
  }


  get displayCount() {
    return this._displayCount;
  }

  public get empty() {
    return this._cards.length === 0;
  }
  public get topCard(): Card {
    return this._cards[this._cards.length - 1];
  }

  ngOnInit() {
  }
}
