import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../services/stock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {

  topStocks: string[] = [];
  news: any[] = [];

  constructor(
    private router: Router,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.stockService.getMarketNews('AAPL').subscribe(data => {
      this.news = data;
    });
  }

  fetchTopStocks(): void {
    // this.stockService.getTopStocks().subscribe((stocks: string[]) => {
    //   this.topStocks = stocks;
    // });
  }

  goToDashboard() {
    this.router.navigate(['/']);
  }



}
