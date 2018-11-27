import { OnChanges, ViewChild, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CardZone } from './card-zone';
import { CdkDropList, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';
import { CardDrop } from './card-drop';
import { coerceBooleanProperty } from '@angular/cdk/coercion';


export class AbstractCardZone implements OnChanges, CardZone  {
  sourceName: string;
  allowedSources: string[] = [];
  canDragItemsToZones: CdkDropList[] = [];

  _allowedSourcesCombined: string[] = [];
  _allowDrop = false;

  @ViewChild(CdkDropList) public _dropzone: CdkDropList;
  cardDropped: EventEmitter<CardDrop> = new EventEmitter<CardDrop>();

  constructor() {
    this.enterPredicate = this.enterPredicate.bind(this);
  }

  set allowDrop(value) {
    this._allowDrop = coerceBooleanProperty(value);
  }

  get allowDrop() {
    return this._allowDrop;
  }

  updateSources(changes) {
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

  getDropzones() {
    return [this._dropzone];
  }


  itemDropped(dropEvent: CdkDragDrop<any>) {
    const source = dropEvent.previousContainer.data;
    const cardValue = dropEvent.item.data;

    const event: CardDrop = {
      source, cardValue
    };

    this.cardDropped.next(event);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateSources(changes);
  }


  enterPredicate(cdkDrag: CdkDrag) {
    const source = cdkDrag.dropContainer.data;
    if (this.allowDrop || this._allowedSourcesCombined.indexOf(source) !== -1) {
      return true;
    }

    return false;
  }
}
