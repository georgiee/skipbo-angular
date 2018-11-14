import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'skipbo-opponents',
  templateUrl: './opponents.component.html',
  styleUrls: ['./opponents.component.scss']
})
export class OpponentsComponent implements OnInit {
  @Input() players = [1, 2];

  constructor() { }

  ngOnInit() {
  }

}
