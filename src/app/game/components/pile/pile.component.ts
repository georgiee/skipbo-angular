import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, AfterViewChecked, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Card } from 'skipbo-core';
import { allSettled } from 'q';
import { transition, style, animate, trigger, animateChild } from '@angular/animations';
import { query } from '@angular/core/src/render3';
import { CdkDropList, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';
import { CardZone } from 'src/app/shared/card-zone';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CardDrop } from '../../shared/card-drop';

const MAX_CARD_DISPLAY = 12;

@Component({
  selector: 'skipbo-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.scss'],
})
export class PileComponent implements CardZone, OnInit, OnChanges {
  private _displayCount = 3;
  private _cards: Card[] = [];
  _stackCardsCount = 0;
  _allowDrop = false;

  @ViewChild(CdkDropList) public _dropzone: CdkDropList;
  @Input()
  set allowDrop(value) {
    this._allowDrop = coerceBooleanProperty(value);
  }
  get allowDrop() {
    return this._allowDrop;
  }
  @Output() cardDropped: EventEmitter<CardDrop> = new EventEmitter<CardDrop>();

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
    this._stackCardsCount = Math.min(this._cards.length, this.displayCount - 1);
  }
  get cards(): Card[] {
    return this._cards;
  }

  @Input()
  set displayCount(value) {
    this._displayCount = Math.max(value, MAX_CARD_DISPLAY);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.allowedSources || changes.sourceName) {
      const allowedSource = changes.allowedSources.currentValue || [];
      let sourceName = changes.sourceName.currentValue || null;

      if (sourceName) {
        sourceName = [sourceName];
      }

      // ensure that we always combine the explicit allowSource with the name of the parent group if any
      // otherwise we can't move inside a pile group
      // this is a very idiomatic solution — should ideally be handled with parent host injection or a service
      this._allowedSourcesCombined = [...allowedSource, ...sourceName];
    }
  }

  getDropzones() {
    return [this._dropzone];
  }


  itemDropped(dropEvent: CdkDragDrop<any>) {
    const source = dropEvent.previousContainer.data;
    const cardValue = dropEvent.item.data;

    const event: CardDrop = {
      source, cardValue
    };

    console.log('itemDropped into a pile', event, event);
    this.cardDropped.next(event);
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

  enterPredicate(cdkDrag: CdkDrag) {
    const source = cdkDrag.dropContainer.data;

    if (this.allowDrop || this._allowedSourcesCombined.indexOf(source) !== -1) {
      return true;
    }

    return false;
  }

  ngOnInit() {
  }
  constructor() {
    this.enterPredicate = this.enterPredicate.bind(this);
  }
}
