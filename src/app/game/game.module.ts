import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { UIModule } from '../ui/ui.module';
import { PlayerComponent } from './player/player.component';
import { DiscardGroupComponent } from './discard-group/discard-group.component';
import { BuildingGroupComponent } from './building-group/building-group.component';
import { StockPileComponent } from './stock-pile/stock-pile.component';

@NgModule({
  declarations: [
    GameComponent,
    PlayerComponent,
    DiscardGroupComponent,
    BuildingGroupComponent,
    StockPileComponent
  ],
  exports: [
    GameComponent
  ],
  imports: [
    CommonModule,
    UIModule
  ]
})
export class GameModule { }
