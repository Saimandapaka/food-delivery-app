import { Component, Input,HostListener } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MenuService } from '@features/menu/services/menu.service';
import { RestaurantService } from '@features/restaurants/services/restaurant.service';
import { CartService } from '@features/cart/services/cart.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OffersComponent } from '../offers/offers.component';
@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [SharedModule,FormsModule,RouterModule,OffersComponent],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
  constructor(private menuservice:MenuService, private restaurantServvice:RestaurantService, private cartservice:CartService){}
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

  const { deliveryFee } = data;
  this.deliveryfee=deliveryFee
});
}
 @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }
  checkScreenSize(){
    this.ismobile=window.innerWidth<=768;
  }


}      

