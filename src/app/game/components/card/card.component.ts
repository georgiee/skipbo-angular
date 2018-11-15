import { Component, OnInit, Input, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, query, transition, animate, stagger, group } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Card } from 'skipbo-core';
import { flipTrigger } from './animations';

@Component({
  selector: 'skipbo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    flipTrigger
  ]
})
export class CardComponent implements OnInit {
  private _revealed: boolean = false;
  private _interactive: boolean = false;

  private _value = null;
  @Input() index: number = 0;

  @Input()
  set value(card: Card) {
    this._value = card;
  }
  get value() {
    return this._value;
  }

  @Input()
  set interactive(value: boolean) {
    this._interactive = coerceBooleanProperty(value);
  }
  get interactive(): boolean {
    return this._interactive;
  }
  @Input()
  set revealed(value: boolean) {
    this._revealed = coerceBooleanProperty(value);
  }
  get revealed(): boolean {
    return this._revealed;
  }

  get flipState() {
    return this._revealed ? 'back' : 'front';
  }

  get backFace() {
    return Card.Back;
  }

  reveal() {
    this.revealed = true;
  }

  hide() {
    this.revealed = false;
  }

  constructor() { }

  ngOnInit() {
  }

}
