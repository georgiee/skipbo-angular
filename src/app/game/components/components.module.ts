import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingGroupComponent } from './building-group/building-group.component';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';
import { DiscardGroupComponent } from './discard-group/discard-group.component';
import { HandComponent } from './hand/hand.component';
import { OpponentPlayerComponent } from './opponent-player/opponent-player.component';
import { OpponentsComponent } from './opponents/opponents.component';
import { PlayerComponent } from './player/player.component';
import { StockPileComponent } from './stock-pile/stock-pile.component';
import { CardComponent } from './card/card.component';
import { CardImageComponent } from './card-image/card-image.component';
import { CardSlotComponent } from './card-slot/card-slot.component';
import { DeckComponent } from './deck/deck.component';
import { PileComponent } from './pile/pile.component';
import { PileGroupComponent } from './pile-group/pile-group.component';
import { HiddenHandComponent } from './hidden-hand/hidden-hand.component';
import { UIModule } from 'src/app/ui/ui.module';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';


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
  CardSlotComponent,
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
export class ComponentsModule { }
