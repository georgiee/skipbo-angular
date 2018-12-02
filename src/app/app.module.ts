import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UIModule } from './ui/ui.module';

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
    // {provide: GAME_DECK_TOKEN, useValue: generateGameThreePlayers()}
  ],
  schemas: []
})
export class AppModule { }
