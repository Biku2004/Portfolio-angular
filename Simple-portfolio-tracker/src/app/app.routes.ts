import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockFormComponent } from './dashboard/stock-form/stock-form.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'form', component: StockFormComponent},
];
