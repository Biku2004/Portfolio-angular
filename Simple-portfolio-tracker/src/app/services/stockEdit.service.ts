import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Stock {
  id?: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockEditService {
  private stockSource = new BehaviorSubject<Stock | null>(null);
  currentStock = this.stockSource.asObservable();

  constructor() {}

  changeStock(stock: Stock | null) {
    this.stockSource.next(stock);
  }
}