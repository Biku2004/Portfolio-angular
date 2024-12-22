import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LandingPageComponent, DashboardComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Simple-portfolio-tracker';
}
