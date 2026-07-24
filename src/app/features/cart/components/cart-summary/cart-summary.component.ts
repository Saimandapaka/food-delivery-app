import { Component, Input,HostListener } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MenuService } from '@features/menu/services/menu.service';
import { RestaurantService } from '@features/restaurants/services/restaurant.service';
import { CartService } from '@features/cart/services/cart.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OffersComponent } from '../offers/offers.component';
import{Router} from '@angular/router';
import{OrderService} from '@features/orders/services/order.service';
import { ProfileService } from '@features/profile/services/profile.service';
import { NotificationsService } from '@features/notifications/services/notifications.service';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [SharedModule,FormsModule,RouterModule,OffersComponent],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
  constructor(private menuservice:MenuService, private restaurantServvice:RestaurantService, private cartservice:CartService, private router:Router, private orderService:OrderService, private profileService: ProfileService,private notificationsService: NotificationsService ){}
  @Input() id!:any;
  @Input() component!:string;
  ismobile!:boolean;
  totalitems!:number;
 totalprice!:number;
  deliveryfee!:number;
  taxes!:number;
  discountamount:number=0;
 finalamount!:number;
 discounttype!:string;
 restaurantName = '';
 ngDoCheck(){
  
  this.totalprice=this.menuservice.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  this.totalitems= this.menuservice.cart.reduce((sum, i) => sum + i.quantity, 0);
  this.discountamount=this.cartservice.discount;
  this.finalamount=this.totalprice+this.deliveryfee-this.cartservice.discount;
  this.discounttype=this.cartservice.discounttype;
 }
 ngOnInit(){
  this.checkScreenSize();
  
this.restaurantServvice.getById(this.id).subscribe((data) => {
   this.restaurantName=data.name;
  const { deliveryFee } = data;
  this.deliveryfee=deliveryFee
});
}

placeOrder() {

  // Stop if cart is empty
  if (this.menuservice.cart.length === 0) {
    return;
  }

  // Get existing orders
  this.orderService.getOrders().subscribe((data: any) => {
    // Find the highest existing id
  

      const prefix = 'QB2024041200';

let maxNumber = 0;

data.orders.forEach((order: any) => {

  if (order.orderNumber) {

    const number = Number(
      order.orderNumber.replace(prefix, '')
    );

    if (!isNaN(number) && number > maxNumber) {
      maxNumber = number;
    }

  }

});

const nextNumber = maxNumber + 1;


        const placedTime = new Date();
        const estimatedDeliveryAt = new Date(placedTime.getTime() + 15 * 60000);
       const selectedAddress = this.profileService.selectedAddress;
        // Create order object
    const order = {
     
   orderNumber: `${prefix}${nextNumber}`,
      userId: 2,
      restaurantId: this.menuservice.cart[0].restaurantId,
      restaurantName: this.restaurantName,
      items: this.menuservice.cart,
      subtotal: this.totalprice,
      deliveryFee: this.deliveryfee,
      discount: this.discountamount,
      total: this.finalamount,
        paymentMethod: 'Online',
      status: 'placed',
       address: selectedAddress,

     placedAt: placedTime.toISOString(),

     estimatedDeliveryAt: estimatedDeliveryAt.toISOString(),

      deliveredAt: null,
      timeline: this.orderService.getTimeline(new Date().toISOString(),'placed')
    };

    // Save order
    this.orderService.placeOrder(order).subscribe((savedOrder: any) => {

      // Create notification
      const notification = {
        userId: 1,
        type: 'orders',
        title: 'Order Placed',
        description:
          `Your order from ${savedOrder.restaurantName} has been placed successfully.`,
        isRead: false,
        createdAt: new Date().toISOString()
       };

       // Save notification
       this.notificationsService.addNotification(notification)

        // Clear cart
        this.menuservice.clearCart();

        // Navigate to success page
        this.router.navigate(['/orders/order-placed']);

      });

    });

  
  

}

trackOrder(): void {

    this.router.navigate(['/orders']);

  }

  // Navigate to Home
  goHome(): void {

    this.router.navigate(['/home']);

  }
 @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }
  checkScreenSize(){
    this.ismobile=window.innerWidth<=768;
  }


}      

