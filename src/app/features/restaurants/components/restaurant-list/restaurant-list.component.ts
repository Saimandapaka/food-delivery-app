import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-list',
  standalone: false,
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;
  selectedFilter: string = 'all';

  filters = [
    { label: 'All',           value: 'all' },
    { label: 'Pure veg',      value: 'veg' },
    { label: 'Rating 4.0+',   value: 'rating' },
    { label: 'Fast delivery', value: 'fast' },
    { label: 'Offers',        value: 'offers' }
  ];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.isLoading = true;
    this.hasError = false;

    this.restaurantService.getAll().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.filteredRestaurants = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  applyFilter(filterValue: string): void {
    this.selectedFilter = filterValue;

    switch (filterValue) {
      case 'veg':
        this.filteredRestaurants = this.restaurants
          .filter(r => r.isVeg);
        break;
      case 'rating':
        this.filteredRestaurants = this.restaurants
          .filter(r => r.rating >= 4.0);
        break;
      case 'fast':
        this.filteredRestaurants = this.restaurants
          .filter(r => r.deliveryTime <= 20);
        break;
      case 'offers':
        this.filteredRestaurants = this.restaurants
          .filter(r => r.offer !== null);
        break;
      default:
        this.filteredRestaurants = this.restaurants;
    }
  }

  goToRestaurant(id: number): void {
    this.router.navigate(['/restaurants', id]);
  }

}