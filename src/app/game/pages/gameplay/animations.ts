import { trigger, query, transition, style, animate, group } from '@angular/animations';

export const pageBuildAnimation = trigger('pageBuildAnimation', [
  transition(':enter', [
    query('.gameplay__opponents', [
      style({
        opacity: 0,
      })
    ]),

    query('.game__deck', [
      style({
        transform: 'translateX(-100%)',
        opacity: 0
      })
    ]),

    query('.game__building', [
      style({
        opacity: 0
      })
    ]),

    query('.gameplay__player', [
      style({
        opacity: 0,
        transform: 'translateY(100%)',
      })
    ]),

    group([
      query('.gameplay__opponents', [
        animate('500ms', style({
          opacity: 1
        }))
      ]),

      query('.game__deck', [
        animate('500ms 150ms cubic-bezier(0.23, 1, 0.32, 1)', style({
          opacity: 1,
          transform: 'translateX(0%)',
        }))
      ]),


      query('.game__building', [
        animate('400ms 200ms', style({
          opacity: 1
        }))
      ]),


      query('.gameplay__player', [
        animate('250ms 400ms cubic-bezier(0.23, 1, 0.32, 1)', style({
          opacity: 1,
          transform: 'translateX(0%)',
        }))
      ])
    ])

  ])
]);
