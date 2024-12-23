import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { StockService } from '../../../services/stock.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitterService } from '../../../services/event-emitter.service';
import { FormsModule } from '@angular/forms';
import { StockEditService } from '../../../services/stockEdit.service';

interface Stock {
  id?: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
}

@Component({
  selector: 'app-edit-stock-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-stock-form.component.html',
  styleUrl: './edit-stock-form.component.css'
})
export class EditStockFormComponent implements OnInit{
stock: Stock = {
    name: '',
    ticker: '',
    quantity: 0,
    buyPrice: 0
  };
  suggestions: any[] = [];
  isEditMode: boolean = false;

  constructor(
    private crudService: CrudService,
    private stockService: StockService,
    private eventEmitterService: EventEmitterService,
    private route: ActivatedRoute,
    private router: Router,
    private stockEditService: StockEditService,
  ) { }


  ngOnInit(): void {
    this.stockEditService.currentStock.subscribe(stock => {
      if (stock) {
        this.stock = stock;
        this.isEditMode = true;
      } else {
        this.resetForm();
      }
    });

    const stockId = this.route.snapshot.paramMap.get('id');
    if (stockId) {
      this.isEditMode = true;
      this.crudService.getStockById(+stockId).subscribe((stock: Stock) => {
        this.stock = stock;
      });
    }
  }

  resetForm() {
    this.stock = {
      name: '',
      ticker: '',
      quantity: 0,
      buyPrice: 0
    };
    this.isEditMode = false;
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


  onSubmit() {
    if (this.isEditMode) {
      this.crudService.updateStock(this.stock).subscribe(() => {
        this.eventEmitterService.onStockUpdated();
        this.stockEditService.changeStock(null);
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.crudService.saveStock(this.stock).subscribe(() => {
        this.eventEmitterService.onStockAdded();
        this.stockEditService.changeStock(null);
        this.router.navigate(['/dashboard']);
      });
    }
  }

  onCancel() {
    this.stockEditService.changeStock(null);
    this.router.navigate(['/dashboard']);
  }
  
}
