import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardImageComponent } from './card-image/card-image.component';
import { CardSlotComponent } from './card-slot/card-slot.component';
import { DeckComponent } from './deck/deck.component';
import { PileComponent } from './pile/pile.component';
import { PileGroupComponent } from './pile-group/pile-group.component';
import { TimesPipe } from './times.pipe';

@NgModule({
  declarations: [
    CardComponent,
    CardImageComponent,
    CardSlotComponent,
    DeckComponent,
    PileComponent,
    PileGroupComponent,
    TimesPipe
  ],
  exports: [
    CardComponent,
    CardSlotComponent,
    PileComponent,
    PileGroupComponent,
    DeckComponent,
    CardImageComponent,
    TimesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class UIModule { }
