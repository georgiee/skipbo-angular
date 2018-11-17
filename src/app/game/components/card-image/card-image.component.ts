import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Card } from 'skipbo-core';


const cardLiteralToValue = value => {
  switch (value) {
    case 'back': return Card.Back;
    case 'empty': return Card.Back;
    case 'skipbo': return Card.SkipBo;
    default: return  Card.Empty;
  }
}
@Component({
  selector: 'skipbo-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
})
export class CardImageComponent {
  private _face: Card = null;

  @Input() set face(value: Card) {
    let valueParsed = null;

    // normalize inputs to integer values matching Card type
    if (typeof value === 'string') {
      valueParsed = cardLiteralToValue(value);
    } else {
      valueParsed = parseInt(value as any, 10);
    }

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

    if (this._face === Card.Back) {
      return 'back';
    }

    return this._face;
  }

}
