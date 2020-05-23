import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingBarService {
  event = new EventEmitter<boolean>();
  constructor() {}

  on() {
    this.event.emit(true);
  }

  off() {
    this.event.emit(false);
  }
}
