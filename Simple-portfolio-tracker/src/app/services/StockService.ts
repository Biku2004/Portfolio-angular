import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Stock {
  id?: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8080/api/stocks'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }

  getStockById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/${id}`);
  }

  saveStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.apiUrl, stock);
  }

  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiUrl}/${stock.id}`, stock);
  }

  deleteStock(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getPortfolioMetrics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/metrics`);
  }

  getStockSuggestions(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/suggestions/${symbol}`);
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// interface Stock {
//   id?: number;
//   name: string;
//   ticker: string;
//   quantity: number;
//   buyPrice: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class StockService {
//   private apiUrl = 'http://localhost:8080/api/stocks'; // Replace with your API URL

//   constructor(private http: HttpClient) { }

//   getStocks(): Observable<Stock[]> {
//     return this.http.get<Stock[]>(this.apiUrl).pipe(
//       catchError(this.handleError)
//     );
//   }

//   getStockById(id: number): Observable<Stock> {
//     return this.http.get<Stock>(`${this.apiUrl}/${id}`).pipe(
//       catchError(this.handleError)
//     );
//   }

//   saveStock(stock: Stock): Observable<Stock> {
//     return this.http.post<Stock>(this.apiUrl, stock).pipe(
//       catchError(this.handleError)
//     );
//   }

//   updateStock(stock: Stock): Observable<Stock> {
//     return this.http.put<Stock>(`${this.apiUrl}/${stock.id}`, stock).pipe(
//       catchError(this.handleError)
//     );
//   }

//   deleteStock(id: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
//       catchError(this.handleError)
//     );
//   }

//   getPortfolioMetrics(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/metrics`).pipe(
//       catchError(this.handleError)
//     );
//   }

//   getStockSuggestions(symbol: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/suggestions/${symbol}`).pipe(
//       catchError(this.handleError)
//     );
//   }

//   private handleError(error: HttpErrorResponse) {
//     let errorMessage = 'Unknown error!';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side errors
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Server-side errors
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.error(errorMessage);
//     return throwError(errorMessage);
//   }
// }