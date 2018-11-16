import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, AfterViewChecked } from '@angular/core';
import { Card } from 'skipbo-core';
import { allSettled } from 'q';
import { transition, style, animate, trigger, animateChild } from '@angular/animations';
import { query } from '@angular/core/src/render3';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { CardZone } from 'src/app/shared/card-zone';

const MAX_CARD_DISPLAY = 12;

@Component({
  selector: 'skipbo-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PileComponent implements CardZone, OnInit {
  private _displayCount = 3;
  private _cards: Card[] = [];
  _stackCardsCount = 0;

  @ViewChild(CdkDropList) public _dropzone: CdkDropList;

  @Input() autoRevealCard = false;
  @Input() canDragItemsToZones: CdkDropList[] = [];

  listEnter(event) {
    console.log({event})
  }

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

  getDropzones() {
    return [this._dropzone];
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
