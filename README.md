# Skipbo in Angular
This is SkipBo made in Angular — and it's only a rough proof of concept I want to archive for future references. This project is for learning purpose and not meant to hurt any copyright.

[Live Example](https://georgiee.github.io/skipbo-angular/#/game/play)
> **Tip**: Press "automata (full)" to let the game play by itself.

---

## How to play
The automata will play the game for all involved players but you can also manually play.

That's harder at the moment as drag & drop is not implemented yet.

Click your hand cards (anywhere) or stock pile if you want to build one of the cards in the center (if possible otherwise you throw an exception). If multiple cards are possible the first on is chosen.

Press "Discard' and the 'Next Player' to switch the player. As you can't play for the opponent press 'Automata (next player)' and complete withby discarding a card.

## What's in the box ?
1. Rules of the games are implemented with a few core classes found in [src/app/skipbo-core](src/app/skipbo-core) with a set of specs.

2. Angular application is only consuming the outputs in the shape of lists of cards through GameService which is really only a small and ugly facade for now.

3. I created all assets with Sketch and got the idea about the layout from the [official game app ](https://play.google.com/store/apps/details?id=com.magmic.googleplay.skipbo.free&hl=en).

![](docs/screenshot.png)

There is also a [video (mp4)](docs/screencast.mp4).


## What's missing

+ Angular Animations (I struggled with triggering animations of nested elements — despite knowing about query & animateChild)
+ Reactive Programming. That was the initial idea, create a core that implement all rules and provide a set of streams for all outputs. The problem here: This needs planning and doesn't fit to the experimental workflow I used for the project. Maybe I can creat something with the knowledge I gained in this project.
+ Drag & Drop:
Angular's Drag & Drop is not flexible enough, Spotifies Draggable not easy to integrate — so I work on using the native Drag & Drop functionality of the browser now.