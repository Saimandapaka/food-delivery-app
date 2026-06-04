import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '@features/restaurants/services/restaurant.service';
import { Restaurant } from '@features/restaurants/models/restaurant.model';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-restaurant-details',
  standalone: false,
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.css',
  
})
export class RestaurantDetailsComponent {
 
    activeTab:string="menu";
    isDesktop: boolean = window.innerWidth > 768;
    isLoading:boolean=false;
    hasError:boolean=false;
    
    restaurant: Restaurant | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

 
@HostListener('window:resize')
onResize() {
  this.isDesktop = window.innerWidth > 768;
}


 ngOnInit(): void {
    
    // Get restaurant from service
    this.restaurant =
      this.restaurantService.getSelectedRestaurant();

    // Page refresh fallback
    if (!this.restaurant) {

      const id = Number(
        this.route.snapshot.paramMap.get('id')
      );

      this.restaurantService.getById(id).subscribe({
        next: (res) => {
          this.restaurant = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }


  goToRestaurant(id: number): void {
    this.router.navigate(['/home', id]);
  }

  vegOnly:boolean= false;
  onVegToggle(event: any) {
  this.vegOnly = event.target.checked;
   }
}
