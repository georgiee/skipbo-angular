import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, ViewChild, Type, ApplicationRef, ContentChild } from '@angular/core';
import { CardPileComponent } from './card-pile.component';
import { TimesPipe } from 'src/app/ui/times.pipe';
import { CardComponent } from '../card/card.component';
import { CardFaceComponent } from '../card-face/card-face.component';

abstract class CardPileAbstract {
  cards = [];
  autoRevealCard = true;
  @ViewChild(CardPileComponent) instance: CardPileComponent;
}

describe('CardPileComponent', () => {
  let fixture: ComponentFixture<CardPileAbstract>;
  let testInstance: CardPileAbstract;
  let pileInstance: CardPileComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardPileComponent,
        BasicComponent,
        TimesPipe,
        CardComponent,
        CardFaceComponent
      ]
    }).compileComponents();
  }));

  function createComponent(component: Type<CardPileAbstract>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    pileInstance = testInstance.instance;
  }

  it('should create', () => {
    createComponent(BasicComponent);
    expect(pileInstance).toBeTruthy();
  });

  it('top card is the last element in the list', () => {
    createComponent(BasicComponent);
    testInstance.cards = [1, 2, 3];

    fixture.detectChanges();

    const [lastElement] = fixture.nativeElement.querySelectorAll('skipbo-card:last-child skipbo-card-face .card');
    expect(lastElement.classList).toContain('card--3');
  });

  it('have total amount of cards', () => {
    createComponent(BasicComponent);
    testInstance.cards = [1, 2, 3];

    fixture.detectChanges();

    const [lastElement] = fixture.nativeElement.querySelectorAll('skipbo-card:last-child skipbo-card-face .card');
    expect(lastElement.classList).toContain('card--3');
  });

  it('hide top card if autoReveal is false', () => {
    createComponent(BasicComponent);
    testInstance.cards = [1, 2, 3];
    testInstance.autoRevealCard = false;

    fixture.detectChanges();

    const [lastElement] = fixture.nativeElement.querySelectorAll('skipbo-card:last-child skipbo-card-face .card');
    expect(lastElement.classList).not.toContain('card--3');
    expect(lastElement.classList).toContain('card--back');

  });
});

  @Component({
    template: `<skipbo-card-pile [autoRevealCard]="autoRevealCard" [cards]="cards"></skipbo-card-pile>`
  })
  class BasicComponent extends CardPileAbstract {
  }
