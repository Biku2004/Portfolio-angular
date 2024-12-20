import { Component,OnInit } from '@angular/core';
// import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { StockService } from '../../services/StockService';


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
  imports: [FormsModule],
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.css'
})

export class StockFormComponent implements OnInit {
  stock = {
    name: '',
    ticker: '',
    quantity: 0,
    buyPrice: 0
  };

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.stockService.saveStock(this.stock).subscribe(response => {
      // Handle response
    });
  }
}