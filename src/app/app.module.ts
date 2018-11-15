import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UIModule } from './ui/ui.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UIModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
