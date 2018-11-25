import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Component, ViewChild } from '@angular/core';
import { Card } from 'skipbo-core';
import { By } from '@angular/platform-browser';
import { GameplayComponent } from './gameplay.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';


@Component({
  template: `empoty`
})
class EmptyComponent { }


const gameAbortSignal = new Subject();
const gameOverSignal = new Subject();

let location: Location;

const GameStubbed = {
  enableLogging: () => {},
  start: () => {},
  stop: () => {},

  get gameAbort$() {
    return gameAbortSignal;
  },

  get gameOver$() {
    return gameOverSignal;
  }

}

const PlayerStubbed = jasmine.createSpyObj('player-stub', {
  'getPlayers': []
});

const routes = [
  { path: 'game/gameover', component:  EmptyComponent }
];


xdescribe('GameplayComponent', () => {
  let component: BaseTestComponent;
  let fixture: ComponentFixture<BaseTestComponent>;

  function createTestComponent(compoonentClass) {
    fixture = TestBed.createComponent(compoonentClass);
    fixture.detectChanges();

    component = fixture.componentInstance;
    location = TestBed.get(Location);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BaseTestComponent,
        GameplayComponent,
        EmptyComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        {provide: GameService, useValue: GameStubbed},
        {provide: PlayerService, useValue: PlayerStubbed}
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();

    location = TestBed.get(Location);

  }));

  it('gameover will trigger router change to /game/gameover', fakeAsync(() => {
    createTestComponent(BaseTestComponent);
    expect(component.instance).toBeTruthy();

    fixture.ngZone.run(() => {
      gameOverSignal.next();
    });

    tick();

    expect(location.path()).toBe('/game/gameover');
  }));

  it('aborted game will trigger router change to /game/gameover', fakeAsync(() => {
    createTestComponent(BaseTestComponent);

    fixture.ngZone.run(() => {
      gameAbortSignal.next();
    });

    tick();
    expect(location.path()).toBe('/game/gameover');
  }));

});

@Component({
  template: `
    <skipbo-gameplay></skipbo-gameplay>
  `
})
class BaseTestComponent {
  public currentFace: Card;
  @ViewChild(GameplayComponent) instance: GameplayComponent;
}
