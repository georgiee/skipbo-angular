import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BuildingPile } from 'src/app/skipbo-core/pile/building-pile';
import { PileGroup } from 'src/app/skipbo-core/pile/pile-group';
import { PileGroupComponent } from '../pile-group/pile-group.component';
import { CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'skipbo-building-group',
  templateUrl: './building-group.component.html',
  styleUrls: ['./building-group.component.scss']
})
export class BuildingGroupComponent implements OnInit {
  @Input() group: PileGroup<BuildingPile>;
  @ViewChild('piles') piles: PileGroupComponent;

  @Input() canDragItemsToZones: CdkDropList<any>[];

  getDropzones(): CdkDropList[] {
    return this.piles.getDropzones();
  }


  constructor() { }

  ngOnInit() {
  }

}
