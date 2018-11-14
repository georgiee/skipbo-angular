import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'skipbo-hidden-hand',
  templateUrl: './hidden-hand.component.html',
  styleUrls: ['./hidden-hand.component.scss']
})
export class HiddenHandComponent implements OnInit {
  @Input() count: number = 5;

  constructor() { }

  ngOnInit() {
  }

}
