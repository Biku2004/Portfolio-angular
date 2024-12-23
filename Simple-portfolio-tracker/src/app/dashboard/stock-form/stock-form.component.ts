import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../../services/crud.service';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitterService } from '../../services/event-emitter.service';

interface Stock {
  id?: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
}

@Component({
  selector: 'app-stock-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  stock: Stock = {
    name: '',
    ticker: '',
    quantity: 0,
    buyPrice: 0
  };
  suggestions: any[] = [];
  isEditMode: boolean = false;
  existingStocks: Stock[] = [];
  errorMessage: string = '';

  constructor(
    private crudService: CrudService,
    private stockService: StockService,
    private eventEmitterService: EventEmitterService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadExistingStocks();
    const stockId = this.route.snapshot.paramMap.get('id');
    if (stockId) {
      this.isEditMode = true;
      this.crudService.getStockById(+stockId).subscribe((stock: Stock) => {
        this.stock = stock;
      });
    }
  }


  fetchStockSuggestions() {
    if (this.stock.ticker.length > 1) {
      this.stockService.getStockSuggestions(this.stock.ticker).subscribe(data => {
        if (data && data.result) {
          this.suggestions = data.result.filter((suggestion: any) => !suggestion.displaySymbol.includes('.'));
        } else {
          this.suggestions = [];
        }
      });
    } else {
      this.suggestions = [];
    }
  }

  fetchStockNameSuggestions() {
    if (this.stock.name.length > 1) {
      this.stockService.getStockSuggestions(this.stock.name).subscribe(data => {
        if (data && data.result) {
          // this.suggestions = data.result;
          this.suggestions = data.result.filter((suggestion: any) => !suggestion.displaySymbol.includes('.'));
        } else {
          this.suggestions = [];
        }
      });
    } else {
      this.suggestions = [];
    }
  }
  
    selectSuggestion(suggestion: any) {
    this.stock.ticker = suggestion.displaySymbol;
    this.stock.name = suggestion.description;
    this.suggestions = [];
  } 

  // onSubmit() {
  //   if (this.isEditMode) {
  //     this.crudService.updateStock(this.stock).subscribe((response: Stock) => {
  //       this.eventEmitterService.onStockUpdated();
  //       this.router.navigate(['/dashboard']);
  //     });
  //   } else {
  //     this.crudService.saveStock(this.stock).subscribe((response: Stock) => {
  //       this.eventEmitterService.onStockAdded();
  //       this.router.navigate(['/dashboard']);
  //     });
  //   }
  // }

  loadExistingStocks(): void {
    this.crudService.getStocks().subscribe((stocks: Stock[]) => {
      this.existingStocks = stocks;
    });
  }

  stockExists(ticker: string): boolean {
    return this.existingStocks.some(stock => stock.ticker === ticker);
  }

  onSubmit(): void {
    if (!this.isEditMode && this.stockExists(this.stock.ticker)) {
      this.errorMessage = 'Stock already exists!';
      return;
    }

    if (this.isEditMode) {
      this.crudService.updateStock(this.stock).subscribe((response: Stock) => {
        this.eventEmitterService.onStockUpdated();
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.crudService.saveStock(this.stock).subscribe((response: Stock) => {
        this.eventEmitterService.onStockAdded();
        this.router.navigate(['/dashboard']);
      });
    }
  }
}

