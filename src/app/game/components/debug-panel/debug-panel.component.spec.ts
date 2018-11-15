import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugPanelComponent } from './debug-panel.component';

describe('DebugPanelComponent', () => {
  let component: DebugPanelComponent;
  let fixture: ComponentFixture<DebugPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebugPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
