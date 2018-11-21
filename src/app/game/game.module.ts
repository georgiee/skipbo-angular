import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIModule } from '../ui/ui.module';


import { GameplayComponent } from './pages/gameplay/gameplay.component';
import { GameComponentsModule } from './components/game-components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    GameplayComponent
  ],
  exports: [
    GameplayComponent
  ],
  imports: [
    CommonModule,
    GameComponentsModule,
    UIModule,
    DragDropModule
  ]
})
export class GameModule { }
