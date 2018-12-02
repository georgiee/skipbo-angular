# Skipbo in Angular
Warning idiomatic code with no comments ahead. That project is only the groundwork for an Angular advanced workshop and far from being done.

This is SkipBo made in Angular — and it's only a rough proof of concept I want to archive for future references. This project is for learning purpose and not meant to hurt any copyright.

[Live Example](https://georgiee.github.io/skipbo-angular/#/game/play)
Use Drag and Drop. Game Rules are enforced through exceptions. Discarding switches to the next player.
If it's not your turn press automata (next player) to auto play for that
> **Tip**: Press "automata (full)" to let the game play by itself.

---

## How to play
The automata will play the game for all involved players but you can also manually play.

## What's in the box ?
1. Rules of the games are implemented with a few core classes found in [src/app/skipbo-core](src/app/skipbo-core) with a set of specs.

2. Angular application is only consuming the outputs in the shape of lists of cards through GameService which is really only a small and ugly facade for now.

3. I created all assets with Sketch and got the idea about the layout from the [official game app ](https://play.google.com/store/apps/details?id=com.magmic.googleplay.skipbo.free&hl=en).

4. Automata that will play for the Non-Human Players or for everyone if you want.
![](docs/preview.gif)

