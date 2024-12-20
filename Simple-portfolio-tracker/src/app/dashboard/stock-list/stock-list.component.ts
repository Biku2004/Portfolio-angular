import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StockService } from '../../services/StockService';

interface Stock {
  id?: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  // currentPrice : number;
  // lossProfit: number;
}


@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'] // Fixed property name
})

export class StockListComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(
    private stockService: StockService, 
    private router: Router) { }

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks() {
    this.stockService.getStocks().subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
    });
  }

  editStock(stock: Stock) {
    this.router.navigate(['/edit-stock', stock.id]);
  }

  deleteStock(stock: Stock) {
    if (stock.id !== undefined) {
      this.stockService.deleteStock(stock.id).subscribe(response => {
        this.loadStocks();
      });
    }
  }
}