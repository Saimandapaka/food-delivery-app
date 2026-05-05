import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '@features/restaurants/services/restaurant.service';
import { Restaurant } from '@features/restaurants/models/restaurant.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MenuCartComponent } from '@features/menu/components/menu-card/menu-cart.component';
@Component({
  selector: 'app-restaurant-details',
  standalone: false,
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.css',
  
})
export class RestaurantDetailsComponent {
   restaurant?: Restaurant;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.restaurantService.getById(id).subscribe({
      next: (data) => {
        this.restaurant = data;
      }
    });
  }

  goToRestaurant(id: number): void {
    this.router.navigate(['/home', id]);
  }

  vegOnly:boolean= false;
  onVegToggle(event: any) {
  this.vegOnly = event.target.checked;
   }
}
