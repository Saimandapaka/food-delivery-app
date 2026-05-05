import { Component, input } from '@angular/core';
import { Input,OnChanges,SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnChanges {
  @Input() restaurant: any;   // from parent
  @Input() restaurantId!: number;
  @Input() vegOnly: boolean = false;

  menuItems: any[] = [];
  groupedMenu: { [key: string]: any[] } = {};
  cart: any[] = [];

  constructor(private http: HttpClient) {}
     
     ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurantId'] || changes['vegOnly']) {
      this.loadMenu();
    }
  }
  ngOnInit(): void {
    if (!this.restaurantId) return;

    this.loadMenu();
  }
 
  // 🔥 Fetch menu
  loadMenu() {
    this.http.get<any[]>(
      `http://localhost:3000/menuItems?restaurantId=${this.restaurantId}`
    ).subscribe((data) => {
       this.menuItems = this.vegOnly
      ? data.filter(item => item.isVeg)
      : data;

      // this.menuItems = data;
      this.groupMenu();
    });
  }

  // 🔥 Group by category
  groupMenu() {
    const grouped: { [key: string]: any[] } = {};

    this.menuItems.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    this.groupedMenu = grouped;
  }
  

  // 🔥 Cart logic
  // addToCart(item: any) {
  //   const existing = this.cart.find(i => i.id === item.id);

  //   if (existing) {
  //     existing.quantity++;
  //   } else {
  //     this.cart = [...this.cart, { ...item, quantity: 1 }];
  //   }
  // }

  // increase(item: any) {
  //   const cartItem = this.cart.find(i => i.id === item.id);

  //   if (cartItem) {
  //     cartItem.quantity++;
  //     this.cart = [...this.cart];
  //   }
  // }

  // decrease(item: any) {
  //   const cartItem = this.cart.find(i => i.id === item.id);

  //   if (!cartItem) return;

  //   cartItem.quantity--;

  //   if (cartItem.quantity <= 0) {
  //     this.cart = this.cart.filter(i => i.id !== item.id);
  //   } else {
  //     this.cart = [...this.cart];
  //   }
  // }

  // getCartItem(item: any) {
  //   return this.cart.find(i => i.id === item.id);
  // }


  getTotal() {
    return this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
   

  scrollToCategory(category: string) {
    const element = document.getElementById(category);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
