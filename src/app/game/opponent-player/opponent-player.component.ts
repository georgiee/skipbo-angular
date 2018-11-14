import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'skipbo-core';

@Component({
  selector: 'skipbo-opponent-player',
  templateUrl: './opponent-player.component.html',
  styleUrls: ['./opponent-player.component.scss']
})
export class OpponentPlayerComponent implements OnInit {
  @Input() player: Player;

  constructor() { }

  ngOnInit() {
  }

}
