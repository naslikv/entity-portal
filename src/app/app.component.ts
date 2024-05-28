import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, RouterLink, DashboardComponent,DatePipe,
      ]
    
})
export class AppComponent {
  title = 'ts-portal';
}
