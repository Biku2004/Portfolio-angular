# Simple Portfolio Tracker - Frontend

## Overview

The **Simple Portfolio Tracker** is a web application built with **Angular 19** and **TypeScript**, enabling users to manage their stock portfolio with real-time stock tracking, portfolio value calculations, and detailed stock insights. The frontend fetches data using the **Finnhub API** and provides a dynamic user interface.
<br/>


## Prerequisites
  Before running the application, ensure the following are installed on your system:
  1.  **Node.js** (version 14 or higher)
  2.  **Angular CLI** (version 15 or higher): Install using:
    
  ```
  
  npm install -g @angular/cli
  
  ```
    
## Features

1.  **Stock Portfolio Management**:
    - Add, view, edit, and delete stock holdings.
    - Multi-select and bulk delete functionalities.
2.  **Real-Time Data**:
    
    *   Fetch live stock prices updated every 10 seconds.
3.  **Dashboard Metrics**:
    
    *   View key metrics, including:
        *   Total portfolio value.
        *   Top-performing stock.
        *   Portfolio distribution.
        *   Market status (open/closed).
4.  **Smart Stock Suggestions**:
    
    *   Suggests stock names/tickers as you type keywords.
    *   Auto-fills ticker and stock name on selection.
5.  **Stock Insights**:
    
    *   Expand stock rows for detailed financial insights like:
        *   10-day average trading volume.
        *   52-week high/low.
        *   Revenue and dividend growth rates.
6.  **Search Functionality**:
    
    *   Quickly search through added stock holdings.


## Installation and Setup

1.  Clone the repository:
    
```

git clone https://github.com/Biku2004/Portfolio-angular.git

```
    
2.  Navigate to the project directory:
    
    
```

cd Simple-portfolio-tracker

```
    
3.  Install dependencies:
    
    
```

npm install

```
    
4.  Run the application:
    
    
```

ng serve

```
    
5.  Open the application in your browser:
    
    
```

http://localhost:4200/

```
    

* * *


### Limitations

*   Stock search is limited to keywords without dots (e.g., "AAPL" or "NVDM"). Tickers with dots (e.g., "NVDM.LS") are not supported.

* * *

### Links

**Deployed Frontend**: https://simple-portfolio-tracker-capx.netlify.app/<br/>
**Backend GitHub Link**: https://github.com/Biku2004/Simple-portfolio-tracker-Backend
