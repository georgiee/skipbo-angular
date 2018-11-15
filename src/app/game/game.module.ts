import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIModule } from '../ui/ui.module';


import { GameComponent } from './pages/game/game.component';
import { GameRoutingModule } from './game.routing';
import { GameoverComponent } from './pages/gameover/gameover.component';
import { GameplayComponent } from './pages/gameplay/gameplay.component';
import { StartComponent } from './pages/start/start.component';
import { ComponentsModule } from './components/components.module';
@NgModule({
  declarations: [
    GameComponent,
    GameoverComponent,
    GameplayComponent,
    StartComponent,
  ],
  exports: [
    GameComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UIModule,
    GameRoutingModule
  ]
})
export class GameModule { }
