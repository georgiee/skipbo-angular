import { trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { CardComponent } from '../card/card.component';

// tslint:disable-next-line:interface-over-type-literal
enum FlipState {
  FRONT = 'front', // value side
  BACK = 'back' // neutral side
}
@Component({
  selector: 'skipbo-flipcard',
  templateUrl: './flipcard.component.html',
  styleUrls: ['./flipcard.component.scss'],
  animations: [
    trigger('flipAnimation', [

    ])
  ]
})
export class FlipCardComponent extends CardComponent {
  flipState = FlipState.BACK;

  constructor() {
    super();
  }

  @HostListener('click')
  toggleFlip() {
    if (this.flipState === FlipState.BACK) {
      this.flipState = FlipState.FRONT;
    } else {
      this.flipState = FlipState.BACK;
    }
  }
}
