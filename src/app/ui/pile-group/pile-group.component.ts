import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'skipbo-core';
import { group } from '@angular/animations';

@Component({
  selector: 'skipbo-pile-group',
  templateUrl: './pile-group.component.html',
  styleUrls: ['./pile-group.component.scss']
})
export class PileGroupComponent implements OnInit {
  private _group: Card[][] = [];

  @Input() public size = 2;

  @Input()
  set group(value: Card[][]) {
    if(value) {
      this._group = value;
    }
  }
  get group() {
    return this._group;
  }

  get displayedGroup() {
    const paddedGroup = this.group.concat(Array.from(Array(this.size)).map(item => []));
    return paddedGroup.slice(0, this.size);
  }

  constructor() { }

  ngOnInit() {
  }

}
