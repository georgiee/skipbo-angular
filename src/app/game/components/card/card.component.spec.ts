import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Component, ViewChild } from '@angular/core';
import { Card } from 'skipbo-core';
import { CardFaceComponent } from '../card-face/card-face.component';



describe('CardComponent', () => {
  let component: BaseTestComponent;
  let fixture: ComponentFixture<BaseTestComponent>;

  function createTestComponent(compoonentClass) {
    fixture = TestBed.createComponent(compoonentClass);
    fixture.detectChanges();

    component = fixture.componentInstance;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BaseTestComponent,
        CardComponent,
        CardFaceComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
  });

  it('should create', () => {
    createTestComponent(BaseTestComponent);
    expect(component.instance).toBeTruthy();
  });

});

@Component({
  template: `
    <skipbo-card [value]="currentValue"></skipbo-card>
  `
})
class BaseTestComponent {
  public currentValue: Card;
  @ViewChild(CardComponent) instance: CardComponent;
}
