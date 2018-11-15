import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, animateChild, query, stagger, sequence, group } from '@angular/animations';

@Component({
  selector: 'skipbo-scratchpad',
  templateUrl: './scratchpad.component.html',
  styleUrls: ['./scratchpad.component.scss'],
  animations: [
    // trigger('appearAnimation', [
    //   transition(':enter', [
    //     query('.xxo', [
    //       style({
    //         opacity: 0,
    //         transformOrigin: 'top center',
    //         transform: 'translateY(20%) rotateX(50deg)'
    //       })
    //     ]),
    //     query('.xxo', stagger(150, [
    //       style({
    //         // transform: 'translateY(20%) rotateX(50deg)'
    //       }),
    //       group([
    //         animate(100, style({opacity: 1})),
    //         animate('350ms cubic-bezier(0.86, 0, 0.07, 1)', style({
    //           transform: 'translateY(0) rotateX(0)'
    //         }))
    //       ])
    //     ]))
    //   ])
    // ])
  ]
})
export class ScratchpadComponent implements OnInit {
  public cards = [1, 2, 3, 4];

  constructor() { }
  trigger() {
    console.log('trigger')
    this.cards.pop();
  }

  appearAnimationStart(event) {
    console.log('appearAnimationStart', event)
  }

  ngOnInit() {
  }

}
