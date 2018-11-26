import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, ViewChild, Type, ApplicationRef, ContentChild } from '@angular/core';
import { StockComponent } from './stock.component';
import { CardPileComponent } from '../card-pile/card-pile.component';
import { TimesPipe } from 'src/app/ui/times.pipe';
import { CardComponent } from '../card/card.component';
import { CardFaceComponent } from '../card-face/card-face.component';

abstract class StocktestAbstract {
  cards = [];
  @ViewChild(StockComponent) instance: StockComponent;
}

describe('StockComponent', () => {
  let fixture: ComponentFixture<StocktestAbstract>;
  let testInstance: StocktestAbstract;
  let stockInstance: StockComponent;
  let applicationRef: ApplicationRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StockComponent,
        BasicComponent,
        CardPileComponent,
        TimesPipe,
        CardComponent,
        CardFaceComponent
      ]
    }).compileComponents();
  }));

  function createComponent(component: Type<StocktestAbstract>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    stockInstance = testInstance.instance;

    applicationRef = TestBed.get(ApplicationRef);
  }

  it('should create', () => {
    createComponent(BasicComponent);
    expect(stockInstance).toBeTruthy();
  });

  it('should display correct count', () => {
    createComponent(BasicComponent);

    testInstance.cards = [1, 2, 3];
    fixture.detectChanges();

    expect(parseInt(fixture.nativeElement.querySelector('.counter').textContent.trim(), 10)).toBe(3);
  });

  it('display pile of cards', () => {
    createComponent(BasicComponent);
    testInstance.cards = [1, 2, 3];
    // 1. the binding from our test wrapper -> skipbo-stock is changing and CD will pick it up.
    // 2. Skipbo Stock will then receive the updated input. It will "optimize" by reuising the existing array
    // 3. skipbo-stock -> pile (<skipbo-card-pile [cards]="cards") will contain NO new reference — only the old one
    // 4. CD will not render the skipbo-stock template again.
    // this will fix the test but it's not working yet. So this would be bad to add actually - it's a fix for the spec not the problem.
    // stockInstance.pile.cdr.markForCheck();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.card--3')).toBeTruthy();

    // last card we find should have the value of 3
    const [lastElement] = fixture.nativeElement.querySelectorAll('skipbo-card:last-child skipbo-card-face .card');
    expect(lastElement.classList).toContain('card--3');
  });
});

  @Component({
    template: `<skipbo-stock [cards]="cards"></skipbo-stock>`
  })
  class BasicComponent extends StocktestAbstract {
  }
