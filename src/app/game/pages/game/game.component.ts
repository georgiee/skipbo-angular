import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'skipbo-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [

  ]
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getRouterState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
