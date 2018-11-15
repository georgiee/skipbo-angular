import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'skipbo-core';
import { PileGroup } from 'src/app/skipbo-core/pile/pile-group';
import { DiscardPile } from 'src/app/skipbo-core/pile/discard-pile';
import { AbstractPile } from 'src/app/skipbo-core/pile/pile-abstract';
import { BuildingPile } from 'src/app/skipbo-core/pile/building-pile';
import { padArray } from 'src/app/utils';

@Component({
  selector: 'skipbo-pile-group',
  templateUrl: './pile-group.component.html',
  styleUrls: ['./pile-group.component.scss']
})
export class PileGroupComponent implements OnInit {
  private _group: PileGroup<DiscardPile|BuildingPile>;

  @Input() public size = 4;

  @Input()
  set group(value: PileGroup<DiscardPile|BuildingPile>) {
    if (value) {
      this._group = value;
    }
  }
  get group() {
    return this._group;
  }

  get displayedPiles(): DiscardPile[]|BuildingPile[] {
    return padArray(Array.from(this.group), this.size);
  }

  constructor() { }

  ngOnInit() {
  }

}
