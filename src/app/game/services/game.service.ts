import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  get deck() {
    return [];
  }

  get building() {
    return [];
  }

  get game() {
    return null;
  }

  start() {
  }

  reset() {
  }


}
