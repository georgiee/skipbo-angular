import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPileComponent } from './stock-pile.component';

describe('StockPileComponent', () => {
  let component: StockPileComponent;
  let fixture: ComponentFixture<StockPileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
