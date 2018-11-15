import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingGroupComponent } from './building-group.component';

describe('BuildingGroupComponent', () => {
  let component: BuildingGroupComponent;
  let fixture: ComponentFixture<BuildingGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
