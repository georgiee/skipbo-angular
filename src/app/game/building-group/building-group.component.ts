import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'skipbo-building-group',
  templateUrl: './building-group.component.html',
  styleUrls: ['./building-group.component.scss']
})
export class BuildingGroupComponent implements OnInit {
  public groups = [[1], [4],[3],[1,2,3,4,5,6,-1]];
  constructor() { }

  ngOnInit() {
  }

}
