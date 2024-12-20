import { Component,OnInit } from '@angular/core';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockService } from '../services/StockService';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

interface Stock {
  id: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  change: number;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StockFormComponent,StockListComponent,CurrencyPipe,PercentPipe,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent implements OnInit {
  totalValue: number = 0;
  topStock: Stock = { id: 0, name: 'N/A', ticker: 'N/A', quantity: 0, buyPrice: 0 , change: 0};
  portfolioDistribution: any = {};
  isStockFormVisible: boolean = false;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.calculateMetrics();
  }

  calculateMetrics() {
    this.stockService.getPortfolioMetrics().subscribe(metrics => {
      this.totalValue = metrics.totalValue;
      this.topStock = metrics.topStock;
      this.portfolioDistribution = metrics.portfolioDistribution;
      this.renderChart();
    });
  }

  renderChart() {
    // Logic to render chart using a library like Chart.js or D3.js
  }

  showStockForm() {
    this.isStockFormVisible = true;
  }

  hideStockForm() {
    this.isStockFormVisible = false;
  }
}