import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { StockService } from '../../services/stock.service';
import { EventEmitterService } from '../../services/event-emitter.service';

interface Stock {
  id?: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice?: number;
  totalValue?: number;
  profitLoss?: number;
  profitLossPercent?: number;

}

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(
    private crudService: CrudService,
    private stockService: StockService,
    private router: Router,
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit(): void {
    this.loadStocks();
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeStockListComponentFunction.subscribe(() => {
        this.loadStocks();
      });
    }
  }

  loadStocks() {
    this.crudService.getStocks().subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
      this.stocks.forEach(stock => {
        this.updateCurrentPrice(stock);
      });
    });
  }

  // updateCurrentPrice(stock: Stock) {
  //   this.stockService.getStockPrice(stock.ticker).subscribe(data => {
  //     stock.currentPrice = data.c;
  //     if (stock.currentPrice !== undefined) {
  //       stock.totalValue = stock.currentPrice * stock.quantity;
  //     }
  //   });
  // }

  updateCurrentPrice(stock: Stock) {
    this.stockService.getStockPrice(stock.ticker).subscribe(data => {
      stock.currentPrice = data.c;
      if (stock.currentPrice !== undefined) {
        stock.totalValue = stock.currentPrice * stock.quantity;
        stock.profitLoss = (stock.currentPrice - stock.buyPrice) * stock.quantity;
        stock.profitLossPercent = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
        // this.saveStock(stock);
      }
    });
  }

  saveStock(stock: Stock): void {
    this.crudService.updateStock(stock).subscribe(
      () => {
        this.loadStocks();
      },
      error => {
        console.error('Error updating stock:', error);
      }
    );
  }

  reloadStocks() {
    this.loadStocks();
  }

  editStock(stock: Stock) {
    this.router.navigate(['/edit-stock', stock.id]);
  }

  deleteStock(stock: Stock): void {
    if (stock.id) {
      this.crudService.deleteStock(stock.id).subscribe(() => {
        this.loadStocks();
      });
    }
  }
}