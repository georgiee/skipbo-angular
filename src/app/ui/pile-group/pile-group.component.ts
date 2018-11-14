import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'skipbo-core';

function padArray(array, size) {
  const padItems = Array.from(Array(size)).map(item => []);
  return array.concat(padItems).slice(0, size);
}
@Component({
  selector: 'skipbo-pile-group',
  templateUrl: './pile-group.component.html',
  styleUrls: ['./pile-group.component.scss']
})
export class PileGroupComponent implements OnInit {
  private _groups: Card[][] = [];

  @Input() public size = 4;

  @Input()
  set groups(value: Card[][]) {
    if (value) {
      this._groups = value;
    }
  }
  get groups() {
    return this._groups;
  }

  get displayedPiles() {
    return padArray(this.groups, this.size);
  }

  constructor() { }

  ngOnInit() {
  }

}
