import { Component, Input,HostListener } from '@angular/core';
import { CartService } from '@features/cart/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '@features/menu/services/menu.service';
import { SharedModule } from '@shared/shared.module';
import { RestaurantService } from '@features/restaurants/services/restaurant.service';
@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule,FormsModule,SharedModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
constructor( private cartservice:CartService,private menuservice : MenuService,private restaurantServvice:RestaurantService){}
issuccess:boolean=false;
ismobile!:boolean;
offers: any[] = [];
selectedItem:string='offer';
selectedIndex!:number;
couponCode!:string;
totalprice!:number;
deliveryfee!:number;
discount!:number;
discountamount:number=0;
appliedCoupon !:any;
minorder:number=0;
message!:string;
couponval:number=0;
isSuccess:boolean=true;//for message color
isavailable:boolean=false;//for coupon applied successfully or not
stotalprice!:number;
spcoupon!:any;
value:number=0;
@Input() id!:any;
  ngDoCheck(){
    
  this.totalprice=this.menuservice.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  
  if(this.totalprice<this.minorder){
        this.discountamount=0;
        this.cartservice.discounttype='';
        this.cartservice.updatediscount(0);
        if(this.couponval===0 && this.value===2)
            this.message='min order'+this.minorder;
        this.isSuccess=false
        this.issuccess=false;
  }
  if(this.couponCode===''){
      this.message='';
      this.discountamount=0;
      this.cartservice.updatediscount(0)
      this.isSuccess=false;
      this.issuccess=false;
  }

  if(this.spcoupon){
    const filteredItems = this.menuservice.cart.filter(
                 item => item.restaurantId === this.spcoupon.restaurantId
          );
          const specific_restaurant_items_price=filteredItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
          if(specific_restaurant_items_price<this.spcoupon.minOrderValue)
          {
            this.issuccess=false;
            this.cartservice.discounttype='';
            this.cartservice.updatediscount(0);
          }
  }
  
 }

 @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }
  checkScreenSize(){
    this.ismobile=window.innerWidth<=768;
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


applyCoupon(couponCod:string,value:any):boolean{
  this.value=value;
  console.log(this.id)
  
   const coupon = this.offers.find(offer =>
      offer.code.toLowerCase() === couponCod.trim().toLowerCase()&&offer.isActive&&(offer.restaurantId === null)
    );
    const specialcoupon=this.offers.find(offer=>
      offer.code.toLowerCase()===couponCod.trim().toLowerCase()&&offer.isActive&&(offer.restaurantId!==null)
    )
     
          this.spcoupon=specialcoupon;
          if(value===1){
            
            if(specialcoupon){
              const filteredItems = this.menuservice.cart.filter(
                 item => item.restaurantId === specialcoupon.restaurantId
          );
              const specific_restaurant_items_price=filteredItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
                if(specific_restaurant_items_price>specialcoupon.minOrderValue)
                  return true;
                else 
                  return false;
            }
            else if(coupon){
              if( this.totalprice>coupon.minOrderValue){
                return true
              }
              else
                return false
            }
            else
              return false
          }
    if(specialcoupon){//for specific reastaurant copons validation
      const filteredItems = this.menuservice.cart.filter(
                 item => item.restaurantId === specialcoupon.restaurantId
          );
       const specific_restaurant_items_price=filteredItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
          if (specific_restaurant_items_price < specialcoupon.minOrderValue) 
             {
                   
                    this.issuccess=false;
                    this.isSuccess=false;
                    this.discount=0
                    this.cartservice.discounttype='';
                      this.cartservice.updatediscount(0);
                    return false;
            }
             if (specialcoupon.discountType === 'percentage') {
  this.cartservice.updatediscount( (specific_restaurant_items_price * specialcoupon.discountValue) / 100);
      this.discount =
        (specific_restaurant_items_price * specialcoupon.discountValue) / 100;

      if (this.discount > specialcoupon.maxDiscount) {
         this.cartservice.updatediscount(specialcoupon.maxDiscount);
        this.discount = specialcoupon.maxDiscount;
        
      }
    }

    else if (specialcoupon.discountType === 'flat') {
       this.cartservice.updatediscount(specialcoupon.discountValue);
      this.discount =specialcoupon.discountValue;
    }

    else if (specialcoupon.discountType === 'delivery') {
       this.cartservice.updatediscount(this.deliveryfee);
     this. discount = this.deliveryfee;
    }
        this.discountamount = this.discount;

   
this.cartservice.discounttype=specialcoupon.code;
this.appliedCoupon=specialcoupon;
    this.message='coupon applied successfully';
    this.issuccess=true;
    this.selectedItem='';
   this.isSuccess=true;
   return true;
         
    }
    if (!coupon&&!specialcoupon) {
     this.couponval=1;
     if(value===2)
this.message='❌ Invalid or expired coupon code. Please try another.';
      else
    this.message='';
     this.discountamount=0
       this.cartservice.discounttype='';
     this.cartservice.updatediscount(0);
     this.isSuccess=false;
     return false;
    }
    this.couponval=0; 
this.minorder=coupon.minOrderValue;
    if (this.totalprice < coupon.minOrderValue) 
    {
      if(value===2)
      this.message='min order'+coupon.minOrderValue;
     else
    this.message='';
      this.isSuccess=false;
      this.discount=0
      this.cartservice.discounttype='';
        this.cartservice.updatediscount(0);
      return false;
    }

    if (coupon.discountType === 'percentage') {
  this.cartservice.updatediscount( (this.totalprice * coupon.discountValue) / 100);
      this.discount =
        (this.totalprice * coupon.discountValue) / 100;

      if (this.discount > coupon.maxDiscount) {
         this.cartservice.updatediscount(coupon.maxDiscount);
        this.discount = coupon.maxDiscount;
        
      }
    }

    else if (coupon.discountType === 'flat') {
       this.cartservice.updatediscount(coupon.discountValue);
      this.discount =coupon.discountValue;
    }

    else if (coupon.discountType === 'delivery') {
       this.cartservice.updatediscount(this.deliveryfee);
     this. discount = this.deliveryfee;
    }

    this.discountamount = this.discount;

   
this.cartservice.discounttype=coupon.code;
this.appliedCoupon=coupon;
    if(value===2)
    this.message='coupon applied successfully';
  else
    this.message='';
    this.issuccess=true;
    this.selectedItem='';
   this.isSuccess=true;
   return true
}
  remove(){

    
    this.selectedItem='offers';
    this.cartservice.updatediscount(0);
    this.cartservice.discounttype='';
    this.issuccess=false;
     this.message='';
  }
 
  isvalid(coupon:any):boolean{
   return this.applyCoupon(coupon.code,1);
  }
}