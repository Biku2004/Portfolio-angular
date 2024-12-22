import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
interface Stock {
  id: string;
  ticker: string;
  name: string;
  buyPrice: number;
}

@Component({
  selector: 'app-stocks-sidebar',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './stocks-sidebar.component.html',
  styleUrl: './stocks-sidebar.component.css'
})
export class StocksSidebarComponent implements OnInit {
  @Input() stocks: Stock[] = [];
  @Output() stockSelect = new EventEmitter<Stock>();
  @Output() stockAdd = new EventEmitter<Stock>();

  searchTerm: string = '';
  isAdding: boolean = false;
  newStockForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newStockForm = this.fb.group({
      ticker: [''],
      name: [''],
      buyPrice: [0]
    });
  }

  ngOnInit(): void {}

  toggleAddStock() {
    this.isAdding = !this.isAdding;
  }

  onSubmit() {
    const newStock: Stock = {
      id: Date.now().toString(),
      ...this.newStockForm.value
    };
    this.stockAdd.emit(newStock);
    this.newStockForm.reset({ ticker: '', name: '', buyPrice: 0 });
    this.isAdding = false;
  }

  onStockSelect(stock: Stock) {
    this.stockSelect.emit(stock);
  }

  filteredStocks(): Stock[] {
    if (!this.searchTerm) {
      return this.stocks;
    }
    return this.stocks.filter(stock =>
      stock.ticker.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}