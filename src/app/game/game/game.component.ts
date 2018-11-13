import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'skipbo-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public buildingGroup = [
    [1], [1,2,3,4], [], [1,2,3,4,5]
  ];
  public discardGroup = [

  ];
  constructor() { }

  ngOnInit() {
  }

}
