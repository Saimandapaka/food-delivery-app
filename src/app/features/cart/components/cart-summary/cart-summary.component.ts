import { Component, Input,HostListener } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MenuService } from '@features/menu/services/menu.service';
import { RestaurantService } from '@features/restaurants/services/restaurant.service';
import { CartService } from '@features/cart/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [SharedModule,FormsModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
  constructor(private menuservice:MenuService, private restaurantServvice:RestaurantService, private cartservice:CartService){}
  @Input() id!:any;
  @Input() component!:string;
  
  ismobile!:boolean;
  offers: any[] = [];
  couponCode!:string;
  totalitems!:number;
 totalprice!:number;
  deliveryfee!:number;
  taxes!:number;
  discount!:number;
  discountamount:number=0;
  appliedCoupon !:string;
 finalamount!:number;
 discounttype!:string;
 minorder:number=0;
 message!:string;
 ngDoCheck(){
  this.totalprice=this.menuservice.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  this.totalitems= this.menuservice.cart.reduce((sum, i) => sum + i.quantity, 0);
  if(this.totalprice<this.minorder){
    this.discountamount=0;
    
  }
  this.finalamount=this.totalprice+this.deliveryfee-this.discountamount;
 }
 ngOnInit(){
  this.checkScreenSize();
  this.cartservice.getAlloffers().subscribe({
        next: (data) => {
          this.offers = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
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
applyCoupon(){
   const coupon = this.offers.find(offer =>
      offer.code.toLowerCase() === this.couponCode.trim().toLowerCase()&&offer.isActive&&(offer.restaurantId === null ||offer.restaurantId == this.id)
    );

    if (!coupon) {
this.message='coupon is not valid';
     this.discountamount=0
     return;
    }
this.couponCode=coupon.code
this.minorder=coupon.minOrderValue;
    if (this.totalprice < coupon.minOrderValue) 
    {
      this.message='min order'+coupon.minOrderValue;
      this.discount=0
      return;
    }

    if (coupon.discountType === 'percentage') {

      this.discount =
        (this.totalprice * coupon.discountValue) / 100;

      if (this.discount > coupon.maxDiscount) {

        this.discount = coupon.maxDiscount;
      }
    }

    else if (coupon.discountType === 'flat') {

      this.discount =coupon.discountValue;
    }

    else if (coupon.discountType === 'delivery') {

     this. discount = this.deliveryfee;
    }

    this.discountamount = this.discount;

   

    this.message='coupon applied succesfully';
   
  }
}

