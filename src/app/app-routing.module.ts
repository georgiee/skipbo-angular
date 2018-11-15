import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
