import { Component } from '@angular/core';
import { MenuModule } from '@features/menu/menu.module';
import { MenuService } from '@features/menu/services/menu.service';
import { EmptyCartComponent } from '../empty-cart/empty-cart.component';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from '@features/profile/components/address-form/address-form.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [MenuModule,CartSummaryComponent,CommonModule,EmptyCartComponent,AddressFormComponent,RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
 cartItems:any[] = [];
 totalitems!:number;
 cval:string="cart";
 
  constructor(public menuservice: MenuService) {}
   ngOnInit(){
   
    this.menuservice.cartSubject .subscribe(items=>{

      this.cartItems = items;

    });

  }
  
  
   ngDoCheck(){
 
  this.totalitems= this.menuservice.cart.reduce((sum, i) => sum + i.quantity, 0);
 
 }
}
