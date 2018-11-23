import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFaceComponent } from './card-face.component';
import { Component, ViewChild } from '@angular/core';
import { Card } from 'skipbo-core';
import { By } from '@angular/platform-browser';



xdescribe('CardFaceComponent', () => {
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

  describe('faces', () => {
    let displayingElement;
    beforeEach(() => {
      createTestComponent(BaseTestComponent);
    });

    function changeFace(cardValue: Card, query) {
      component.currentFace = cardValue;
      fixture.detectChanges();

      displayingElement = fixture.debugElement.query(By.css(query));
    }

    it('display nothing by default', () => {
      createTestComponent(BaseTestComponent);

      expect(fixture.nativeElement.querySelector('.card--none')).toBeTruthy();
      expect(component.instance).toBeTruthy();
    });

    it('display 1', () => {
      changeFace(Card.One, '.card--1');
      expect(displayingElement).toBeTruthy();
    });

    it('display 2', () => {
      changeFace(Card.Two, '.card--2');
      expect(displayingElement).toBeTruthy();
    });

    it('display 3', () => {
      changeFace(Card.Three, '.card--3');
      expect(displayingElement).toBeTruthy();
    });

    it('display 4', () => {
      changeFace(Card.Four, '.card--4');
      expect(displayingElement).toBeTruthy();
    });

    it('display 5', () => {
      changeFace(Card.Five, '.card--5');
      expect(displayingElement).toBeTruthy();
    });

    it('display 7', () => {
      changeFace(Card.Seven, '.card--7');
      expect(displayingElement).toBeTruthy();
    });

    it('display 8', () => {
      changeFace(Card.Eight, '.card--8');
      expect(displayingElement).toBeTruthy();
    });

    it('display 9', () => {
      changeFace(Card.Nine, '.card--9');
      expect(displayingElement).toBeTruthy();
    });

    it('display 10', () => {
      changeFace(Card.Ten, '.card--10');
      expect(displayingElement).toBeTruthy();
    });

    it('display 11', () => {
      changeFace(Card.Eleven, '.card--11');
      expect(displayingElement).toBeTruthy();
    });

    it('display 12', () => {
      changeFace(Card.Twelve, '.card--12');
      expect(displayingElement).toBeTruthy();
    });

    it('display Skipbo', () => {
      changeFace(Card.SkipBo, '.card--skipbo');
      expect(displayingElement).toBeTruthy();
    });

    it('display empty', () => {
      changeFace(Card.Empty, '.card--none');
      expect(displayingElement).toBeTruthy();
    });

    it('display back', () => {
      changeFace(Card.Back, '.card--back');
      expect(displayingElement).toBeTruthy();
    });

    it('display rubbish as empty', () => {
      changeFace('rubbish' as any, '.card--none');
      expect(displayingElement).toBeTruthy();
    });

    it('display null as empty', () => {
      changeFace(null, '.card--none');
      expect(displayingElement).toBeTruthy();
    });
  });

});

@Component({
  template: `
    <skipbo-card-face [face]="currentFace"></skipbo-card-face>
  `
})
class BaseTestComponent {
  public currentFace: Card;
  @ViewChild(CardFaceComponent) instance: CardFaceComponent;
}
