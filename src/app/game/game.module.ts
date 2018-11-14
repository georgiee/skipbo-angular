import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { UIModule } from '../ui/ui.module';
import { PlayerComponent } from './player/player.component';
import { DiscardGroupComponent } from './discard-group/discard-group.component';
import { BuildingGroupComponent } from './building-group/building-group.component';
import { StockPileComponent } from './stock-pile/stock-pile.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { HandComponent } from './hand/hand.component';
import { OpponentPlayerComponent } from './opponent-player/opponent-player.component';
import { HiddenHandComponent } from './hidden-hand/hidden-hand.component';
import { OpponentsComponent } from './opponents/opponents.component';

@NgModule({
  declarations: [
    GameComponent,
    PlayerComponent,
    DiscardGroupComponent,
    BuildingGroupComponent,
    StockPileComponent,
    HandComponent,
    OpponentPlayerComponent,
    HiddenHandComponent,
    OpponentsComponent
  ],
  exports: [
    GameComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    DragDropModule
  ]
})
export class GameModule { }
