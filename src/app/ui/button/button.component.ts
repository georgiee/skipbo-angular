import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[skipbo-button], a[skipbo-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  private _condensed = false;

  @HostBinding('class.condensed')
  @Input()
  set condensed(value) {
    this._condensed = coerceBooleanProperty(value);
  }
  get condensed() {
    return this._condensed;
  }
  constructor() { }

  ngOnInit() {
  }

}
