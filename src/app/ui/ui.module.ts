import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardImageComponent } from './card-image/card-image.component';
import { CardSlotComponent } from './card-slot/card-slot.component';
import { DeckComponent } from './deck/deck.component';
import { HandComponent } from './hand/hand.component';
import { PileComponent } from './pile/pile.component';
import { PileGroupComponent } from './pile-group/pile-group.component';

@NgModule({
  declarations: [
    CardComponent,
    CardImageComponent,
    CardSlotComponent,
    DeckComponent,
    HandComponent,
    PileComponent,
    PileGroupComponent
  ],
  exports: [
    CardComponent,
    CardSlotComponent,
    PileComponent,
    PileGroupComponent,
    HandComponent,
    DeckComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UIModule { }
