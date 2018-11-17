import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'skipbo-core';

@Component({
  selector: 'skipbo-opponent-player',
  templateUrl: './opponent-player.component.html',
  styleUrls: ['./opponent-player.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.have-turn]': 'player?.playing'
  }
})
export class OpponentPlayerComponent implements OnInit {
  @Input() player: Player;

  constructor() { }

  ngOnInit() {
  }

}
