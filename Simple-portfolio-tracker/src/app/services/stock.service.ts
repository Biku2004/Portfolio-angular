
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class StockService {
//   private apiUrl = 'http://localhost:8080/api/stocks';

//   constructor(private http: HttpClient) {}

//   getStockOptions(symbol: string): Observable<string[]> {
//     return this.http.get<string[]>(`${this.apiUrl}/${symbol}/options`);
//   }

//   getStockPrice(symbol: string): Observable<number> {
//     return this.http.get<number>(`${this.apiUrl}/${symbol}/price`);
//   }

//   getTopStocks(): Observable<string[]> {
//     return this.http.get<string[]>(`${this.apiUrl}/top`);
//   }

//   getStockSuggestions(symbol: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/suggestions/${symbol}`);
//   }

//   getPortfolioMetrics(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/metrics`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MarketStatus {
  exchange: string;
  holiday: string | null;
  isOpen: boolean;
  session: string | null;
  t: number;
  timezone: string;
}

interface BasicFinancials {
  metric: {
    "10DayAverageTradingVolume": number;
    "52WeekHigh": number;
    "52WeekHighDate": string;
    "52WeekLow": number;
    "52WeekLowDate": string;
    "revenueGrowth5Y": number;
    "dividendGrowthRate5Y": number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8080/api/stocks';

  constructor(private http: HttpClient) {}

  getStockPrice(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${symbol}/price`);
  }

  getMarketStatus(exchange: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${exchange}/market-status`);
  }

  getMarketNews(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${symbol}/market-news`);
  }

  getBasicFinancials(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${symbol}/basic-financials`);
  }

  getStockSuggestions(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/suggestions/${symbol}`);
  }

  getPortfolioMetrics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/metrics`);
  }
}