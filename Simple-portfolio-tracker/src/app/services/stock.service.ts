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
  private apiUrl = 'http://backend-portfolio-env.eba-hb9e3thu.ap-south-1.elasticbeanstalk.com:8080/api/stocks';

  constructor(private http: HttpClient) {}

  getStockPrice(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${symbol}/price`);
  }

  // getMarketStatus(exchange: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${exchange}/market-status`);
  // }

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