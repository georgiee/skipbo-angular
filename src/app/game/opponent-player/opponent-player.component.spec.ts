import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentPlayerComponent } from './opponent-player.component';

describe('OpponentPlayerComponent', () => {
  let component: OpponentPlayerComponent;
  let fixture: ComponentFixture<OpponentPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpponentPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
