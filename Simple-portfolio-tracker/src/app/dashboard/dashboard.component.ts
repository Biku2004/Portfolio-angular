import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockService } from '../services/stock.service';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../services/portfolio.service';

// npm install highcharts

// npm install --save-dev @types/highcharts
interface Stock {
  id: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  change: number;
  profitLoss: number;
  profitLossPercentage? : number;
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
  topStock: Stock | null = null;
  portfolioDistribution: { [key: string]: number } = {};
  isStockFormVisible: boolean = false;
  marketStatus: { exchange: string, isOpen: boolean } = { exchange: '', isOpen: false };


  constructor(private stockService: StockService, private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.calculateMetrics();
    this.loadPortfolioData();
    this.loadMarketStatus();
  }

  calculateMetrics() {
    this.stockService.getPortfolioMetrics().subscribe(metrics => {
      this.totalValue = metrics.totalValue;
      this.topStock = metrics.topStock || { id: 0, name: 'N/A', ticker: 'N/A', quantity: 0, buyPrice: 0 };
      this.portfolioDistribution = metrics.portfolioDistribution;
      // this.renderChart();
    });
  }

  // renderChart() {
  //   // Logic to render chart using a library like Chart.js or D3.js
  // }

  loadMarketStatus(): void {
    this.stockService.getMarketStatus('US').subscribe(
      status => {
        this.marketStatus.exchange = status.exchange;
        this.marketStatus.isOpen = status.isOpen;
      },
      error => {
        console.error('Error fetching market status:', error);
      }
    );
  }

  showStockForm() {
    this.isStockFormVisible = true;
  }


  hideStockForm() {
    this.isStockFormVisible = false;
  }


  loadPortfolioData(): void {
    this.portfolioService.getTotalPortfolioValue().subscribe(
      value => {
        this.totalValue = value;
      },
      error => {
        console.error('Error fetching total portfolio value:', error);
      }
    );

    this.portfolioService.getTopPerformingStock().subscribe(
      stock => {
        this.topStock = stock;
      },
      error => {
        console.error('Error fetching top performing stock:', error);
      }
    );

    this.portfolioService.getPortfolioDistribution().subscribe(
      distribution => {
        this.portfolioDistribution = distribution;
        this.updatePortfolioDistribution();
      },
      error => {
        console.error('Error fetching portfolio distribution:', error);
      }
    );
  }

  updatePortfolioDistribution(): void {
    const distributionData = Object.entries(this.portfolioDistribution).map(([key, value]) => ({
      name: key,
      y: value
    }));

    Highcharts.chart('portfolio-distribution', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Portfolio Distribution'
      },
      series: [{
        type: 'pie',
        name: 'Percentage',
        colorByPoint: true,
        data: distributionData
      }]
    } as any);
  }
}