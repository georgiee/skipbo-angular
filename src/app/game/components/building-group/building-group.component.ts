import { Component, OnInit, Input } from '@angular/core';
import { BuildingPile } from 'src/app/skipbo-core/pile/building-pile';
import { PileGroup } from 'src/app/skipbo-core/pile/pile-group';

@Component({
  selector: 'skipbo-building-group',
  templateUrl: './building-group.component.html',
  styleUrls: ['./building-group.component.scss']
})
export class BuildingGroupComponent implements OnInit {
  @Input() group: PileGroup<BuildingPile>;

  constructor() { }

  ngOnInit() {
  }

}
