import { Component, Input } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MenuService } from '@features/menu/services/menu.service';
import { RestaurantService } from '@features/restaurants/services/restaurant.service';
@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
  constructor(private menuservice:MenuService, private restaurantServvice:RestaurantService){}
  @Input() id!:any;
  @Input() component!:string;
  @Input() view!:boolean;
  totalitems!:number;
 totalprice!:number;
 
  deliveryfee!:number;
  taxes!:number;
  discount!:number;
  discountamount!:number;
 finalamount!:number;
 ngDoCheck(){
  this.totalprice=this.menuservice.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  this.totalitems= this.menuservice.cart.reduce((sum, i) => sum + i.quantity, 0);
  this.finalamount=this.totalprice+this.deliveryfee;
 }
 ngOnInit(){
  
this.restaurantServvice.getById(this.id).subscribe((data) => {

  const { deliveryFee } = data;
  this.deliveryfee=deliveryFee
});
}
}
