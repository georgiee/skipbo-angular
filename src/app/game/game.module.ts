import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './services/game.service';
import { GameplayComponent } from './pages/gameplay/gameplay.component';
import { CardComponent } from './components/card/card.component';
import { CardFaceComponent } from './components/card-face/card-face.component';
import { CardPileComponent } from './components/card-pile/card-pile.component';
import { UIModule } from '../ui/ui.module';
import { GameoverComponent } from './pages/gameover/gameover.component';
import { StartComponent } from './pages/start/start.component';
import { RulebookComponent } from './pages/rulebook/rulebook.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './pages/game/game.component';
import { PileGroupComponent } from './components/pile-group/pile-group.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    GameplayComponent,
    CardComponent,
    CardFaceComponent,
    CardPileComponent,
    GameoverComponent,
    StartComponent,
    RulebookComponent,
    GameComponent,
    PileGroupComponent,
    PlayerComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    FormsModule,
    RouterModule,
    GameRoutingModule
  ],
  providers: [
    GameService
  ],
  exports: [

  ]
})
export class GameModule { }
