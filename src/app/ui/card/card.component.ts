import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { trigger, state, style, query, transition, animate } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'skipbo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('flip', [
      state('back',
        style({ transform: 'rotateY(180deg)' })
      ),
      state('front',
        style({
          transform: 'rotateY(0deg)'
        })
      ),

      // introduce distinct values for each transition to ensure always clockwise animations
      transition('back => front', [
        style({
          transform: 'rotateY(180deg)'
        }),
        animate('500ms cubic-bezier(0.23, 1, 0.32, 1)',
        style({
          transform: 'rotateY(360deg)'
        }))
      ]),

      transition('front => back', [
        style({
          transform: 'rotateY(0deg)'
        }),
        animate('500ms cubic-bezier(0.23, 1, 0.32, 1)',
        style({
          transform: 'rotateY(180deg)'
        }))
      ]),
    ])
  ]
})
export class CardComponent implements OnInit {
  private _revealed: boolean = false;
  private _interactive: boolean = false;


  @Input() value = 2;

  @Input()
  set interactive(value: boolean) {
    this._interactive = coerceBooleanProperty(value);
  }
  get interactive(): boolean {
    return this._interactive;
  }

  @Input()
  set revealed(value: boolean) {
    this._revealed = coerceBooleanProperty(value);
  }
  get revealed(): boolean {
    return this._revealed;
  }

  get flipState() {
    return this._revealed ? 'back' : 'front';
  }

  reveal() {
    this.revealed = true;
  }

  hide() {
    this.revealed = false;
  }

  // @HostListener('click')
  // handleClick() {
  //   if (this.interactive) {
  //     return;
  //   }
  //   this.reveal();
  // }

  constructor() { }

  ngOnInit() {
  }

}
