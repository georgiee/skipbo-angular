import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PileGroupComponent } from './pile-group.component';

describe('PileGroupComponent', () => {
  let component: PileGroupComponent;
  let fixture: ComponentFixture<PileGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PileGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PileGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
