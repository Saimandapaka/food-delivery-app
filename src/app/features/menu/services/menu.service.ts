import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }
   public cartSubject = new BehaviorSubject<any[]>([]);
   cart$ = this.cartSubject.asObservable();
  get cart() {
    return this.cartSubject.value;
  }

  addToCart(item: any) {
    // create the new array with the existing cart items-->copy cart
  const cart = [...this.cart];
  const index = cart.findIndex(i => i.id === item.id);
  if (index !== -1) {
    cart[index] = {
      ...cart[index],
      quantity: cart[index].quantity + 1
    };
  }
  // if the item is not in the cart, add it with quantity 1
   else {
    cart.push({ ...item, id: item.id, quantity: 1 });
  }

  this.cartSubject.next(cart);
}
  increase(item: any) {

    const cart = [...this.cart];

    const existing = cart.find(i => i.id === item.id);

    if (existing) {
      existing.quantity++;
    }

    this.cartSubject.next(cart);
  }

  decrease(item: any) {
    let cart = [...this.cart];
    const existing = cart.find(i => i.id === item.id);
    if (!existing) return;
    existing.quantity--;
    if (existing.quantity <= 0) {
      cart = cart.filter(i => i.id !== item.id);
    }

    this.cartSubject.next(cart);

  }
  // Remove all items from cart
clearCart() {
 this.cartSubject.next([]);

}
}
