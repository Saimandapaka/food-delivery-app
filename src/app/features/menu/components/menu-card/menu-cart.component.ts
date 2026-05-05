import { Component, input } from '@angular/core';
import { MenuService } from '@features/menu/services/menu.service';
import { Input ,Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu-cart',

  
  templateUrl: './menu-cart.component.html',
  styleUrl: './menu-cart.component.css'
})
export class MenuCartComponent {
  @Input() groupedMenu!: { [key: string]: any[] };
  @Input() cart: any[] = [];
 @Input() vegOnly: boolean = false;
@Input() restaurant: any;
// @Output() add = new EventEmitter<any>();
  get filteredMenu() {
  if (!this.vegOnly) return this.groupedMenu;

  const filtered: any = {};

  for (const key in this.groupedMenu) {
    filtered[key] =
      this.groupedMenu[key].filter(item => item.isVeg);
  }

  return filtered;
}
  
     
  getTotal() {
    return this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
  addToCart(item: any) {
    const existing = this.cart.find(i => i.id === item.id);

    if (existing) {
      existing.quantity++;
    } else {
      this.cart = [...this.cart, { ...item, quantity: 1 }];
    }
  }

  increase(item: any) {
    const cartItem = this.cart.find(i => i.id === item.id);

    if (cartItem) {
      cartItem.quantity++;
      this.cart = [...this.cart];
    }
  }

  decrease(item: any) {
    const cartItem = this.cart.find(i => i.id === item.id);

    if (!cartItem) return;

    cartItem.quantity--;

    if (cartItem.quantity <= 0) {
      this.cart = this.cart.filter(i => i.id !== item.id);
    } else {
      this.cart = [...this.cart];
    }
  }
   getCartItem(item: any) {
    return this.cart.find(i => i.id === item.id);
  }

  

}
