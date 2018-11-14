import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Card } from 'skipbo-core';

@Component({
  selector: 'skipbo-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent {
  @Input() cards: Card[] = [];
  constructor() {

  }
}
