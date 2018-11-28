import { Component, HostListener } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'skipbo-flipcard',
  templateUrl: './flipcard.component.html',
  styleUrls: ['./flipcard.component.scss'],
  animations: [ ]
})
export class FlipCardComponent extends CardComponent {
  constructor() {
    super();
  }

  @HostListener('click')
  toggleFlip() {
    console.log('toggleFlip');
  }
}
