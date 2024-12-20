import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'https://api.example.com/stocks'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveStock(stock: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, stock);
  }

  deleteStock(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getPortfolioMetrics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/metrics`);
  }
}