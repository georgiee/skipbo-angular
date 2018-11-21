import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'skipbo-core';
import { parseCardFace, cardToFace } from './utils';


@Component({
  selector: 'skipbo-card-face',
  templateUrl: './card-face.component.html',
  styleUrls: ['./card-face.component.scss']
})
export class CardFaceComponent implements OnInit {
  private _face: Card = null;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set face(value: Card) {
    this._face = parseCardFace(value);
  }
  get face() {
    return this._face;
  }

  get currentCardImage () {
    return cardToFace(this.face);
  }
}
