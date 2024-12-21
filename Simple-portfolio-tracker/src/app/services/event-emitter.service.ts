import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokeStockListComponentFunction = new EventEmitter();
  subsVar: Subscription | undefined;

  constructor() { }

  onStockAdded() {
    this.invokeStockListComponentFunction.emit();
  }

  onStockUpdated() {
    this.invokeStockListComponentFunction.emit();
  }
}