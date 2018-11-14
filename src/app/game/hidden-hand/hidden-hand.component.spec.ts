import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenHandComponent } from './hidden-hand.component';

describe('HiddenHandComponent', () => {
  let component: HiddenHandComponent;
  let fixture: ComponentFixture<HiddenHandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiddenHandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
