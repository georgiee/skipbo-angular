import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardGroupComponent } from './discard-group.component';

describe('DiscardGroupComponent', () => {
  let component: DiscardGroupComponent;
  let fixture: ComponentFixture<DiscardGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscardGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
