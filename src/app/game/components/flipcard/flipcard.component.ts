import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
      state('front', style({
        transform: 'rotateY(180deg)'
      })),
      state('back', style({
        transform: 'rotateY(0deg)'
      })),

      transition('back => front, void => front', [
        animate('500ms 250ms cubic-bezier(0.23, 1, 0.32, 1)',
          style({
            transform: 'rotateY(180deg)'
          })
        )
      ])
    ])
  ]
})
export class FlipCardComponent extends CardComponent implements OnChanges {
  flipAnimationSubject = new BehaviorSubject('back');
  flipAnimation$ = this.flipAnimationSubject.asObservable();

  get flipState() {
    return this.revealed ? FlipState.FRONT : FlipState.BACK;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.flipAnimationSubject.next(this.flipState);
    }

    if (changes.revealed) {
      this.flipAnimationSubject.next(this.flipState);
    }
  }
}
