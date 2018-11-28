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
import { OpponentPlayerComponent } from './components/opponent-player/opponent-player.component';
import { OpponentsComponent } from './components/opponents/opponents.component';
import { HiddenHandComponent } from './components/hidden-hand/hidden-hand.component';
import { StockComponent } from './components/stock/stock.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HandComponent } from './components/hand/hand.component';
import { FlipCardComponent } from './components/flipcard/flipcard.component';

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
    PlayerComponent,
    OpponentPlayerComponent,
    OpponentsComponent,
    HiddenHandComponent,
    StockComponent,
    HandComponent,
    FlipCardComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    FormsModule,
    RouterModule,
    GameRoutingModule,
    DragDropModule
  ],
  providers: [
  ],
  exports: [

  ]
})
export class GameModule { }
