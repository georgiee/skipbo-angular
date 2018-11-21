import { CdkDropList } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { BuildingPile, DiscardPile, PileGroup } from 'skipbo-core';
import { CardZone } from 'src/app/shared/card-zone';
import { CardDrop } from '../../shared/card-drop';
import { PileComponent } from '../pile/pile.component';

let counter = 0;
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
  @Input() allowDrop = false;
  @Output() cardDropped: EventEmitter<{cardDrop: CardDrop, pile: BuildingPile}> = new EventEmitter<any>();

  // list of strings compared with the cdkDropList data field to calculate the enterPredicated
  @Input() allowedSources: string[] = [];
  @Input() sourceName: string = 'pilegroup' + (counter++);

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
    });
  }

  ngOnInit() {
  }

  handleCardDropped(cardDrop: CardDrop, pile) {
    this.cardDropped.next({cardDrop, pile});
  }

}
