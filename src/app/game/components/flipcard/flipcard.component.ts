import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { tag } from 'rxjs-spy/operators';
import { CardComponent } from '../card/card.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'skipbo-flipcard',
  templateUrl: './flipcard.component.html',
  styleUrls: ['./flipcard.component.scss'],
  animations: [
    trigger('appearAnimation', [
      transition(':enter', [
        style({
          opacity: 0.1
        }),
        animate('1.4s', style({
          opacity: 1
        }))
      ]),
    ]),

    trigger('flipAnimation', [
      // neutral side

      state('back',
        style({
          transform: 'rotateY(0deg)'
        })
      ),

      // value side
      state('front',
        style({ transform: 'rotateY(180deg)' })
      ),


      transition('* => front', [
        style({
          transform: 'rotateY(0deg)'
        }),
        animate('500ms cubic-bezier(0.23, 1, 0.32, 1)',
        style({
          transform: 'rotateY(180deg)'
        }))
      ]),



      transition('front => back', [
        style({
          transform: 'rotateY(180deg)'
        }),
        animate('500ms cubic-bezier(0.23, 1, 0.32, 1)',
        style({
          transform: 'rotateY(0deg)'
        }))
      ])
    ])
  ]
})
export class FlipCardComponent extends CardComponent implements OnChanges {
  flipAnimationSubject = new BehaviorSubject('back');
  flipAnimation$;

  constructor() {
    super();
    this.flipAnimation$ = this.flipAnimationSubject
      .pipe(
        tag('flip')
      );
  }
  @HostListener('click')
  test() {
    this.flipAnimation$.next('back');
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.revealed) {
      this.flipAnimation$.next(this.revealed ? 'front' : 'back');
    }
  }
}
