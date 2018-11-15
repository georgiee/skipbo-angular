import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesPipe } from './times.pipe';
import { ButtonComponent } from './button/button.component';
import { HeadlineComponent } from './headline/headline.component';

@NgModule({
  declarations: [
    TimesPipe,
    ButtonComponent,
    HeadlineComponent
  ],
  exports: [
    TimesPipe,
    ButtonComponent,
    HeadlineComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UIModule { }
