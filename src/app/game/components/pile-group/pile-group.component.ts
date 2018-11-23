import { Component, Input } from '@angular/core';
import { BuildingPile, DiscardPile, PileGroup } from 'skipbo-core';

@Component({
  selector: 'skipbo-pile-group',
  templateUrl: './pile-group.component.html',
  styleUrls: ['./pile-group.component.scss']
})
export class PileGroupComponent {
  private _group: PileGroup<DiscardPile|BuildingPile>;

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
}
