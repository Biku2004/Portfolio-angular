// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { StockService } from '../../services/StockService';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';

// interface Stock {
//   id?: number;
//   name: string;
//   ticker: string;
//   quantity: number;
//   buyPrice: number;
// }

// @Component({
//   selector: 'app-stock-form',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './stock-form.component.html',
//   styleUrls: ['./stock-form.component.css']
// })
// export class StockFormComponent implements OnInit {
//   stock: Stock = {
//     name: '',
//     ticker: '',
//     quantity: 0,
//     buyPrice: 0
//   };
//   suggestions: any[] = [];
//   isEditMode: boolean = false;

//   constructor(
//     private stockService: StockService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     const stockId = this.route.snapshot.paramMap.get('id');
//     if (stockId) {
//       this.isEditMode = true;
//       this.stockService.getStockById(+stockId).subscribe((stock: Stock) => {
//         this.stock = stock;
//       });
//     }
//   }

//   fetchStockSuggestions() {
//     if (this.stock.ticker.length > 1) {
//       this.stockService.getStockSuggestions(this.stock.ticker).subscribe(data => {
//         if (data && data['bestMatches']) {
//           this.suggestions = data['bestMatches'];
//         } else {
//           this.suggestions = [];
//         }
//       });
//     } else {
//       this.suggestions = [];
//     }
//   }

//   onSubmit() {
//     if (this.isEditMode) {
//       this.stockService.updateStock(this.stock).subscribe((response: Stock) => {
//         this.router.navigate(['/dashboard']);
//       });
//     } else {
//       this.stockService.saveStock(this.stock).subscribe((response: Stock) => {
//         this.router.navigate(['/dashboard']);
//       });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/StockService';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const stockId = this.route.snapshot.paramMap.get('id');
    if (stockId) {
      this.isEditMode = true;
      this.stockService.getStockById(+stockId).subscribe((stock: Stock) => {
        this.stock = stock;
      });
    }
  }

  fetchStockSuggestions() {
    if (this.stock.ticker.length > 1) {
      this.stockService.getStockSuggestions(this.stock.ticker).subscribe(data => {
        if (data && data['bestMatches']) {
          this.suggestions = data['bestMatches'];
        } else {
          this.suggestions = [];
        }
      });
    } else {
      this.suggestions = [];
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.stockService.updateStock(this.stock).subscribe((response: Stock) => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.stockService.saveStock(this.stock).subscribe((response: Stock) => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}