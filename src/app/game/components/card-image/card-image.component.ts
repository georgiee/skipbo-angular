import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Card } from 'skipbo-core';

@Component({
  selector: 'skipbo-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
})
export class CardImageComponent {
  private _face: Card = null;

  @Input() set face(value: Card) {
    const valueParsed = parseInt(value as any, 10);
    if (valueParsed) {
      this._face = valueParsed;
    } else {
      this._face = null;
    }
  }

  get currentFace () {
    if (this._face === null) {
      return 'none';
    }

    if (this._face === Card.SkipBo) {
      return 'skipbo';
    }
    return this._face;
  }

}
