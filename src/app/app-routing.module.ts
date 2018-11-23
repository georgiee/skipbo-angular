import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameModule } from './game/game.module';

export const routes: Routes = [

];

@NgModule({
  imports: [
    GameModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
