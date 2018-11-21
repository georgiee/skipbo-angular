import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { TimesPipe } from './times.pipe';

@NgModule({
  declarations: [
    TimesPipe,
    ButtonComponent
  ],
  exports: [
    TimesPipe,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UIModule { }
