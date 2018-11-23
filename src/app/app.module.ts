import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { GameModule } from './game/game.module';
import { GameService } from './game/services/game.service';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UIModule } from './ui/ui.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GameModule,
    UIModule,
    RouterModule.forRoot([])
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
