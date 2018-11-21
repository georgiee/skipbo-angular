import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIModule } from 'src/app/ui/ui.module';
import { BuildingGroupComponent } from './building-group/building-group.component';
import { CardImageComponent } from './card-image/card-image.component';
import { CardComponent } from './card/card.component';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';
import { DeckComponent } from './deck/deck.component';
import { DiscardGroupComponent } from './discard-group/discard-group.component';
import { HandComponent } from './hand/hand.component';
import { HiddenHandComponent } from './hidden-hand/hidden-hand.component';
import { OpponentPlayerComponent } from './opponent-player/opponent-player.component';
import { OpponentsComponent } from './opponents/opponents.component';
import { PileGroupComponent } from './pile-group/pile-group.component';
import { PileComponent } from './pile/pile.component';
import { PlayerComponent } from './player/player.component';
import { StockPileComponent } from './stock-pile/stock-pile.component';



const components = [
  BuildingGroupComponent,
  DebugPanelComponent,
  DiscardGroupComponent,
  HandComponent,
  OpponentPlayerComponent,
  OpponentsComponent,
  PlayerComponent,
  StockPileComponent,
  CardComponent,
  CardImageComponent,
  DeckComponent,
  PileComponent,
  PileGroupComponent,
  HiddenHandComponent
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
