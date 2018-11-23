import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { GameoverComponent } from './pages/gameover/gameover.component';
import { GameplayComponent } from './pages/gameplay/gameplay.component';
import { StartComponent } from './pages/start/start.component';
import { RulebookComponent } from './pages/rulebook/rulebook.component';

export const routes: Routes = [
  {
    path: 'game', component: GameComponent,
    children: [
      {
        path: '', redirectTo: 'start', pathMatch: 'full'
      },
      {
        path: 'start', component: StartComponent
      },
      {
        path: 'play', component: GameplayComponent
      },
      {
        path: 'gameover', component: GameoverComponent
      },
      {
        path: 'rules', component: RulebookComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }