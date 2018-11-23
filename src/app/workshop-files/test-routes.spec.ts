import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';

let location: Location;
let router: Router;
let fixture: ComponentFixture<any>;

class DummyService {

}

import {routes} from './../app-routing.module';
import {routes as gameRoutes} from './../game/game-routing.module';

import { AppComponent } from '../app.component';
import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { GameService } from '../game/services/game.service';
import { PlayerService } from '../game/services/player.service';
import { RulebookComponent } from '../game/pages/rulebook/rulebook.component';
import { GameComponent } from '../game/pages/game/game.component';
import { StartComponent } from '../game/pages/start/start.component';
import { GameoverComponent } from '../game/pages/gameover/gameover.component';
import { GameplayComponent } from '../game/pages/gameplay/gameplay.component';
import { FormsModule } from '@angular/forms';

xdescribe('workshop routing', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([...gameRoutes, ...routes]),
        FormsModule
      ],
      declarations: [
        AppComponent,
        WelcomeComponent,
        GameplayComponent,
        RulebookComponent,
        GameComponent,
        StartComponent,
        GameoverComponent
      ],
      providers: [
        { provide: GameService, useClass: DummyService },
        { provide: GameService, useClass: DummyService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
  }));

  describe('application routing (app-routing.module)', () => {
    it('navigate to "" redirects you to /welcome', fakeAsync(() => {
      fixture.ngZone.run(() => router.navigate(['']));
      tick();
      expect(location.path()).toBe('/welcome');
    }));

    it('navigate to /welcome displays the welcome component', fakeAsync(() => {
      fixture.ngZone.run(() => router.navigate(['/welcome']));
      tick();
      expect(fixture.nativeElement.querySelector('skipbo-welcome')).toBeTruthy();
    }));

  });


  describe('game routing (game-routing.module)', () => {
    it('navigate to "/game" redirects you to /game/start', fakeAsync(() => {
      fixture.ngZone.run(() => router.navigate(['/game']));
      tick();
      expect(location.path()).toBe('/game/start');
    }));

    it('navigate to "/game/start" display StartComponent', fakeAsync(() => {
      fixture.ngZone.run(() => router.navigate(['/game/start']));
      tick();
      expect(fixture.nativeElement.querySelector('skipbo-start')).toBeTruthy();
    }));

    it('navigate to "/game/rules" displays RulebookComponent', fakeAsync(() => {
      fixture.ngZone.run(() => router.navigate(['/game/rules']));
      tick();
      expect(fixture.nativeElement.querySelector('skipbo-rulebook')).toBeTruthy();
    }));

    it('navigate to "/game/gameover" displays GameoverComponent', fakeAsync(() => {
      fixture.ngZone.run(() => router.navigate(['/game/gameover']));
      tick();
      expect(fixture.nativeElement.querySelector('skipbo-gameover')).toBeTruthy();
    }));

    it('navigate to "/game/play" displays GameplayComponent', fakeAsync(() => {
      fixture.ngZone.run(() => router.navigate(['/game/play']));
      tick();
      expect(fixture.nativeElement.querySelector('skipbo-gameplay')).toBeTruthy();
    }));
  });
});
