// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface Stock {
//   id: number;
//   name: string;
//   ticker: string;
//   quantity: number;
//   buyPrice: number;
//   currentPrice: number;
//   totalValue: number;
//   profitLoss: number;
//   profitLossPercentage: number;
//   change : number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class PortfolioService {
//   private apiUrl = '/api/portfolio';

//   constructor(private http: HttpClient) {}

//   getTotalPortfolioValue(): Observable<number> {
//     return this.http.get<number>(`${this.apiUrl}/total-value`);
//   }

//   getTopPerformingStock(): Observable<Stock> {
//     return this.http.get<Stock>(`${this.apiUrl}/top-performing`);
//   }

//   getPortfolioDistribution(): Observable<Map<string, number>> {
//     return this.http.get<Map<string, number>>(`${this.apiUrl}/distribution`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Stock {
  id: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  change : number;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'https://backend-portfolio-env.eba-hb9e3thu.ap-south-1.elasticbeanstalk.com:8080/api/portfolio';

  constructor(private http: HttpClient) {}

  getTotalPortfolioValue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-value`).pipe(
      catchError(this.handleError)
    );
  }

  getTopPerformingStock(): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/top-performing`).pipe(
      catchError(this.handleError)
    );
  }

  getPortfolioDistribution(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/distribution`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}