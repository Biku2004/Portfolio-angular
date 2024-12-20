import { Component,OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { StockService } from '../../services/StockService';

interface Stock {
  id: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
}

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})

export class StockListComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks() {
    this.stockService.getStocks().subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
    });
  }

  editStock(stock: Stock) {
    // Logic to edit stock details
  }

  deleteStock(stock: Stock) {
    this.stockService.deleteStock(stock.id).subscribe(response => {
      this.loadStocks();
    });
  }
}