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

@Injectable({
  providedIn: 'root'
})
export class MarketStatusService {
  private apiUrl = 'https://api.simple-portfolio-tracker.site/api/stocks';

  constructor(private http: HttpClient) {}

  getMarketStatus(exchange: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${exchange}/market-status`);
  }

}
