import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'food-delivery-app';
  showFooter = true;

constructor(private router: Router) {
  this.router.events.subscribe(() => {
    this.showFooter = !this.router.url.includes('restaurant-details');
  });
}
}
