import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'skipbo-discard-group',
  templateUrl: './discard-group.component.html',
  styleUrls: ['./discard-group.component.scss']
})
export class DiscardGroupComponent implements OnInit {
  @Input() cards: [[],[]];

  constructor() { }

  ngOnInit() {
  }

}
