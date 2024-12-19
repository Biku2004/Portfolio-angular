import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LandingPageComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Simple-portfolio-tracker';
}
