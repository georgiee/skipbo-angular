import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentsComponent } from './opponents.component';

describe('OpponentsComponent', () => {
  let component: OpponentsComponent;
  let fixture: ComponentFixture<OpponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
