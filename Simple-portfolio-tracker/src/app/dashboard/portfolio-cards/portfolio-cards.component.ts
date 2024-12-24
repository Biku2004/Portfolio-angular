// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { StockService } from '../../services/stock.service';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { interval, Subscription } from 'rxjs';
import { MarketStatusService } from '../../services/marketStatus.service';

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
  selector: 'app-portfolio-cards',
  standalone: true,
  imports: [CommonModule,CurrencyPipe, PercentPipe],
  templateUrl: './portfolio-cards.component.html',
  styleUrl: './portfolio-cards.component.css'
})


export class PortfolioCardsComponent implements OnInit {
  totalValue: number = 0;
  topStock: Stock | null = null;
  portfolioDistribution: { [key: string]: number } = {};
  isStockFormVisible: boolean = false;
  marketStatus: { exchange: string, isOpen: boolean } = { exchange: '', isOpen: false };
  isSpinning: boolean = false;
  // private updateSubscription: Subscription | null = null;

  constructor(
    private stockService: StockService, 
    private marketService: MarketStatusService, 
    private portfolioService: PortfolioService,
  
  ) { }

  ngOnInit(): void {
    this.calculateMetrics();
    this.loadPortfolioData();
    this.loadMarketStatus();
  }

  // loadDashboardData(): void {
  //   this.calculateMetrics();
  //   this.loadMarketStatus();
  // }

  calculateMetrics() {
    this.stockService.getPortfolioMetrics().subscribe(metrics => {
      this.totalValue = metrics.totalValue;
      this.topStock = metrics.topStock || { id: 0, name: 'N/A', ticker: 'N/A', quantity: 0, buyPrice: 0 };
      this.portfolioDistribution = metrics.portfolioDistribution;
    });
  }

  loadMarketStatus(): void {
    this.marketService.getMarketStatus('US').subscribe(
      status => {
        this.marketStatus.exchange = status.exchange;
        this.marketStatus.isOpen = status.isOpen;
      },
      error => {
        console.error('Error fetching market status:', error);
      }
    );
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