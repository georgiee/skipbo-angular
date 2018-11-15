import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';
import { ScratchpadComponent } from './pages/scratchpad/scratchpad.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'welcome', pathMatch: 'full'
  },
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: 'instructions', component: InstructionsComponent
  },
  {
    path: 'game', loadChildren: './game/game.module#GameModule'
  },
  {
    path: 'scratchpad', component: ScratchpadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
