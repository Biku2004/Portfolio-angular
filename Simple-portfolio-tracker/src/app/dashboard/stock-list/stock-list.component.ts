// import { Component, OnInit } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { StockService } from '../../services/stock.service';
import { EventEmitterService } from '../../services/event-emitter.service';
import { EditStockFormComponent } from "../stock-form/edit-stock-form/edit-stock-form.component";
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, EditStockFormComponent,FormsModule],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];
  // @Output() stocksUpdated = new EventEmitter<Stock[]>();
  isEditStockFormVisible: boolean = false;
  selectedStock: Stock | null = null;
  searchTerm: string = '';

  constructor(
    private crudService: CrudService,
    private stockService: StockService,
    private router: Router,
    private eventEmitterService: EventEmitterService
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
  }

  editStock(stock: Stock) {
    this.router.navigate(['/edit-stock', stock.id]);
  }

  deleteStock(stock: Stock): void {
    if (stock.id) {
      this.crudService.deleteStock(stock.id).subscribe(() => {
        this.loadStocks();
      });
    }
  }


  showEditStockForm(stock: Stock) {
    this.selectedStock = stock;
    this.isEditStockFormVisible = true;
  }

  
  hideEditStockForm() {
    this.isEditStockFormVisible = false;
    this.selectedStock = null;
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