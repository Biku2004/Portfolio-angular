import { Component } from '@angular/core';
import { StockListComponent } from './stock-list/stock-list.component';
import { CommonModule } from '@angular/common';
import { PortfolioCardsComponent } from "../dashboard/portfolio-cards/portfolio-cards.component";
import { Router } from '@angular/router';

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
  imports: [CommonModule,StockListComponent,PortfolioCardsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})


export class DashboardComponent {

  constructor(
    private router: Router,
  ) { }

  goToHome() {
    this.router.navigate(['/home']);
  }
}