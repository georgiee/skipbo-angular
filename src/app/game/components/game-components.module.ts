import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIModule } from 'src/app/ui/ui.module';
import { CardImageComponent } from './card-image/card-image.component';
import { CardComponent } from './card/card.component';
import { DeckComponent } from './deck/deck.component';
import { HandComponent } from './hand/hand.component';
import { PileComponent } from './pile/pile.component';
import { PlayerComponent } from './player/player.component';
import { StockPileComponent } from './stock-pile/stock-pile.component';



const components = [
  HandComponent,
  PlayerComponent,
  StockPileComponent,
  CardComponent,
  CardImageComponent,
  DeckComponent,
  PileComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    UIModule,
    DragDropModule
  ],
  exports: [
    ...components
  ]
})
export class GameComponentsModule { }
