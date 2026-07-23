import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{MenuService} from '../../features/menu/services/menu.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { OrderService } from '@features/orders/services/order.service';
import{RestaurantService} from '../../features/restaurants/services/restaurant.service';
import{NotificationsService} from '../../features/notifications/services/notifications.service';
import { ProfileService } from '@features/profile/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;
  notificationCount: number = 0;
  restaurantName = "";
  orderId: string = '';
  orderStatus: string = '';
  orderNumber: string = '';
order:any;

mode="list";
  constructor(private router: Router, private menuService: MenuService, private restaurantService: RestaurantService, private notificationsService: NotificationsService,private orderService: OrderService,private profileservice : ProfileService) {}

  isHomePage(): boolean {
    return this.router.url === '/home' || this.router.url === '/';
   }
   isRestaurantsPage(): boolean {
    return this.router.url.startsWith('/restaurants/');
    }
    isCartPage(): boolean {
   return this.router.url === '/cart';
   }
   isOrdersPage(): boolean {
  return this.router.url === '/orders';
 }
 isNotificationsPage(): boolean {
  return this.router.url === '/notifications';
}
 isProfilePage(): boolean {
  return this.router.url === '/profile';
}
isOrderDetailsPage(): boolean {
 
  return this.router.url.startsWith('/orders/');
}
 issavedaddressPage(): boolean {
    return this.router.url.startsWith('/profile/savedaddress');
    }
     isprofileinfopage(): boolean {
    return this.router.url.startsWith('/profile/personalinfo');
    }
changemode(){
  this.profileservice.mode.next("list");
}
changemodetoadd(){
this.profileservice.mode.next("add");
}
   ngOnInit(): void {
    this.orderService.getLatestOrder().subscribe(data => {

      this.order = data[data.length - 1];
      
      console.log(data)
    });
    this.profileservice.mode.subscribe(mode => {
    this.mode = mode;
  });
    this.menuService.cart$.subscribe(cart => {
      // "Take many values and make them into one value." 
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
     // Runs whenever user navigates to another page
    //  With pipe(), we can filter or modify the events before they reach subscribe().
     this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
        if (this.isOrderDetailsPage()) {
      this.loadOrderDetails();
    }
      // Check if current page is /restaurants/:id
      if (this.router.url.startsWith('/restaurants/')) {

        // Get the id from the URL
        const id = Number(this.router.url.split('/')[2]);

        // Fetch restaurant from API
        this.restaurantService.getById(id).subscribe(res => {
          this.restaurantName = res.name;
        });

      }
    });
    this.notificationsService.loadNotifications();

  setInterval(() => {
    this.notificationsService.loadNotifications();
  }, 2000);

this.notificationsService.notifications$
  .subscribe(data => {

    this.notificationCount =
      data.filter(n => !n.isRead).length;

  });
 

}
loadOrderDetails(): void {

  // Check if current page is Order Details
  if (this.router.url.startsWith('/orders/')) {

    // Get Order ID from URL
    const id = this.router.url.split('/')[2];


    // Fetch order details
    this.orderService
      .getOrderById(id)
      .subscribe(order => {


        // Your db.json contains only "id"
        this.orderNumber = order.orderNumber;
        this.orderStatus = order.status; 

      });

  }
   
}
  

  navigateTo(path: string): void {
    if(this.profileservice.from===1&&window.innerWidth<=768)
      {
        this.router.navigate(["/profile"])
        this.profileservice.from=0;
      }
    else
    {
       this.router.navigate([path]);
       this.profileservice.from=0;
    }
   
  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }
}