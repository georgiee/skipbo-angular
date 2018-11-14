import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'skipbo-discard-group',
  templateUrl: './discard-group.component.html',
  styleUrls: ['./discard-group.component.scss']
})
export class DiscardGroupComponent implements OnInit {
  public groups = [[], [],[3],[1,2,3,4,5,6,-1]];

  constructor() { }

  ngOnInit() {
  }

}
