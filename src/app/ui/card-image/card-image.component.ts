import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Card } from 'skipbo-core';

@Component({
  selector: 'skipbo-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
})
export class CardImageComponent {
  private _face: Card = Card.SkipBo;

  @Input() set face(value: Card) {
    this._face = value;
  }

  get currentFace () {
    if (this._face === Card.SkipBo) {
      return 'skipbo';
    }
    return this._face;
  }

}
