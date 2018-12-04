# Skipbo in Angular

This is the project from a [workshop](https://github.com/georgiee/angular-workshop-skipbo) where we build this project over six chapters.

![](docs/preview.gif)

Try out the [Live Example](https://georgiee.github.io/skipbo-angular).

+ Use Drag and Drop.
+ Game Rules are enforced through exceptions.
+ Discarding switches to the next player.
+ Oscar 🐙 will play for all CPU players after you discard
+ You see it's your turn by looking at the hotpink border
+ Angular Animations for the flipping animation
+ Guard to protected from entering and leaving the game.

## Game
1. Rules of the games are implemented with a few core classes found in [src/app/skipbo-core](src/app/skipbo-core) with a set of specs. See my original project [skipbo-typescript-jest](https://github.com/georgiee/skipbo-typescript-jest)

2. Angular application is only consuming the output of the core in the shape of lists of cards through GameService which is really only a small and ugly facade for now.

3. I created all assets with Sketch and got the idea about the layout from the [official game app ](https://play.google.com/store/apps/details?id=com.magmic.googleplay.skipbo.free&hl=en).

4. Oscar 🐙  will play for the Non-Human Players or for everyone if you want. He follows the game rules but is not that smart (yet!) 🤓


> **Acknowledgement:**
> This project is public and meant for learning purposes. It's not meant to hurt any copyright. Code & Image assets are custom made, the background image is from [here](https://askubuntu.com/questions/29199/how-do-i-add-a-background-in-aisleriot-solitaire)
