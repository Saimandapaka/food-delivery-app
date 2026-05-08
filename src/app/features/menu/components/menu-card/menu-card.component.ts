

import { Component,Input ,Output, EventEmitter } from '@angular/core';
import { MenuService } from '@features/menu/services/menu.service';
@Component({
  selector: 'app-menu-card',

  
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent {
  // @Input() groupedMenu!: { [key: string]: any[] };
  // @Input() category: any;
  @Input() item: any;
  @Input() cart: any[] = [];

  @Output() add = new EventEmitter<any>();
  @Output() inc = new EventEmitter<any>();
  @Output() dec = new EventEmitter<any>();

  getCartItem(item: any) {
    return this.cart.find(i => i.id === item.id);
  }
}
