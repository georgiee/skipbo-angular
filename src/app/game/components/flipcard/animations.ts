import { trigger, state, style, transition, animate } from '@angular/animations';

export const flipTrigger = trigger('flip', [
  state('back',
    style({ transform: 'rotateY(180deg)' })
  ),
  state('front',
    style({
      transform: 'rotateY(0deg)'
    })
  ),

  // introduce distinct values for each transition to ensure always clockwise animations

  // back is neutral, front the value
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

  transition('* => front', [
    style({
      transform: 'rotateY(180deg)'
    }),
    animate('500ms cubic-bezier(0.23, 1, 0.32, 1)',
    style({
      transform: 'rotateY(360deg)'
    }))
  ]),
]);
