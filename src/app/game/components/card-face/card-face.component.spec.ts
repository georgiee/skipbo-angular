import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFaceComponent } from './card-face.component';

describe('CardFaceComponent', () => {
  let component: CardFaceComponent;
  let fixture: ComponentFixture<CardFaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
