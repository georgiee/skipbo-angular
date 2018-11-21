import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './services/game.service';
import { GameplayComponent } from './pages/gameplay/gameplay.component';
import { CardComponent } from './components/card/card.component';
import { CardFaceComponent } from './components/card-face/card-face.component';
import { CardPileComponent } from './components/card-pile/card-pile.component';
import { UIModule } from '../ui/ui.module';

@NgModule({
  declarations: [
    GameplayComponent, CardComponent, CardFaceComponent, CardPileComponent
  ],
  imports: [
    CommonModule,
     UIModule
  ],
  providers: [
    GameService
  ],
  exports: [
    GameplayComponent
  ]
})
export class GameModule { }
