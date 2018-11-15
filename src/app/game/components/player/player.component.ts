import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Player } from 'skipbo-core';
import { HandComponent } from '../hand/hand.component';
import { DiscardGroupComponent } from '../discard-group/discard-group.component';

@Component({
  selector: 'skipbo-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @Input() public player: Player;
  @ViewChild('hand') hand: HandComponent;
  @ViewChild('discard') discard: DiscardGroupComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.hand.v
  }

}
