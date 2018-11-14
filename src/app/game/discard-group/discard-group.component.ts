import { Component, OnInit, Input, HostBinding, ViewChild, AfterContentInit } from '@angular/core';
import { PileGroup } from 'src/app/skipbo-core/pile/pile-group';
import { DiscardPile } from 'src/app/skipbo-core/pile/discard-pile';

@Component({
  selector: 'skipbo-discard-group',
  templateUrl: './discard-group.component.html',
  styleUrls: ['./discard-group.component.scss']
})
export class DiscardGroupComponent {
  @Input() group: PileGroup<DiscardPile>;
  constructor() { }

}
