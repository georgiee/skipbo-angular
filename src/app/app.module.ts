import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UIModule } from './ui/ui.module';
import { AppRoutingModule } from './app-routing.module';
import { GAME_DECK_TOKEN } from './game/services/game.service';
import { generateGameThreePlayers } from 'skipbo-core';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UIModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: GAME_DECK_TOKEN, useValue: generateGameThreePlayers()}
  ],
  schemas: []
})
export class AppModule { }
