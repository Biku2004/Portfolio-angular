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
  private apiUrl = 'https://portfolio-tracker-backend-env.eba-cntjmzha.ap-south-1.elasticbeanstalk.com:443/api/stocks';

  constructor(private http: HttpClient) {}

  getMarketStatus(exchange: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${exchange}/market-status`);
  }

}
