// import { Component, OnInit } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { StockService } from '../../services/stock.service';
import { EventEmitterService } from '../../services/event-emitter.service';
import { EditStockFormComponent } from "../stock-form/edit-stock-form/edit-stock-form.component";
import { FormsModule } from '@angular/forms';
import { StockEditService } from '../../services/stockEdit.service';
import { StockFormComponent } from '../stock-form/stock-form.component';

interface Stock {
  id?: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice?: number;
  totalValue?: number;
  profitLoss?: number;
  profitLossPercent?: number;
  selected?: boolean;
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

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, EditStockFormComponent,FormsModule,StockFormComponent],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];
  // @Output() stocksUpdated = new EventEmitter<Stock[]>();
  isEditStockFormVisible: boolean = false;
  selectedStock: Stock | null = null;
  searchTerm: string = '';
  financials?: BasicFinancials | null = null;
  isFinancialsVisible: boolean = false;
  isStockFormVisible: boolean = false;

  constructor(
    private crudService: CrudService,
    private stockService: StockService,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private stockEditService: StockEditService
  ) { }

  ngOnInit(): void {
    this.loadStocks();
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeStockListComponentFunction.subscribe(() => {
        this.loadStocks();
      });
    }
  }



  loadStocks() {
    this.crudService.getStocks().subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
      this.stocks.forEach(stock => {
        this.updateCurrentPrice(stock);
      });
    });
  }


  updateCurrentPrice(stock: Stock) {
    this.stockService.getStockPrice(stock.ticker).subscribe(data => {
      stock.currentPrice = data.c;
      if (stock.currentPrice !== undefined) {
        stock.totalValue = stock.currentPrice * stock.quantity;
        stock.profitLoss = (stock.currentPrice - stock.buyPrice) * stock.quantity;
        stock.profitLossPercent = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 10;
        this.saveStock(stock);
      }
    });
  }


  saveStock(stock: Stock): void {
    this.crudService.updateStock(stock).subscribe(
      () => {
        // Removed this.loadStocks to prevent recursive call
        console.log('Stock updated successfully');
      },
      error => {
        console.error('Error updating stock:', error);
      }
    );
  }

  reloadStocks() {
    this.loadStocks();
    setInterval(() => {
      this.loadStocks();
    }, 10000);
  }


  deleteStock(stock: Stock): void {
    if (stock.id) {
      this.crudService.deleteStock(stock.id).subscribe(() => {
        this.loadStocks();
      });
    }
  }

  showFinancials(stock: Stock) {
    this.stockService.getBasicFinancials(stock.ticker).subscribe(financials => {
      this.financials = financials;
      this.isFinancialsVisible = true;
    });
  }

  hideFinancials() {
    this.isFinancialsVisible = false;
    this.financials = null;
  }



  showEditStockForm(stock: Stock) {
    this.stockEditService.changeStock(stock);
    this.isEditStockFormVisible = true;
  }

  hideEditStockForm() {
    this.isEditStockFormVisible = false;
    this.stockEditService.changeStock(null);
  }

  showStockForm() {
    this.isStockFormVisible = true;
  }


  hideStockForm() {
    this.isStockFormVisible = false;
  }

  onSave(updatedStock: Stock) {
    this.crudService.updateStock(updatedStock).subscribe(() => {
      this.hideEditStockForm();
      this.loadStocks();
    });
  }

  formatProfitLoss(value: number): string {
    return value >= 0 ? `+${value.toFixed(2)}` : `${value.toFixed(2)}`;
  }

  formatProfitLossPercent(value: number): string {
    return value >= 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
  }

  deleteSelectedStocks(): void {
    const selectedStocks = this.stocks.filter(stock => stock.selected);
    selectedStocks.forEach(stock => {
      if (stock.id) {
        this.crudService.deleteStock(stock.id).subscribe(() => {
          this.loadStocks();
        });
      }
    });
  }

  toggleSelectAll(event: any): void {
    const isChecked = event.target.checked;
    this.stocks.forEach(stock => stock.selected = isChecked);
  }

  filteredStocks(): Stock[] {
    if (!this.searchTerm) {
      return this.stocks;
    }
    return this.stocks.filter(stock =>
      stock.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


}