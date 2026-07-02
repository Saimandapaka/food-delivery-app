import { Component} from '@angular/core';
import { Input,OnChanges,SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

import { MenuService } from '@features/menu/services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',

  

  styleUrl: './menu-list.component.css',
  

})
export class MenuListComponent implements OnChanges {
   @Input() restaurantId!: number;
  @Input() vegOnly: boolean = false;
  @Input() restaurant: any;
resId!:number;
  menuItems: any[] = [];
  groupedMenu: { [key: string]: any[] } = {};
  cart: any[] = [];
  constructor(private http: HttpClient,public menuservice :MenuService,private cd:ChangeDetectorRef) {}
  activeCategory: string = '';

selectCategory(categoryKey: string) {
  this.activeCategory = categoryKey;
  this.scrollToCategory(categoryKey);
}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurantId'] || changes['vegOnly']) {
      this.loadMenu();
    }
    
  }

  loadMenu() {
    this.http.get<any[]>(
      `http://localhost:3000/menuItems?restaurantId=${this.restaurantId}`
    ).subscribe((data) => {

      const filtered = this.vegOnly
        ? data.filter(item => item.isVeg)
        : data;

      this.menuItems = filtered;
      this.groupMenu();
    });
  }

 groupMenu() {
  const grouped: any = {};

  for (const item of this.menuItems) {


    if (!item?.category) continue;

    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }

    grouped[item.category].push(item);
  }

  
  this.groupedMenu = grouped;
  console.log(this.groupedMenu);
}
 ngOnInit(): void {
  this.menuservice.cart$.subscribe(items => {
    this.cart = [...items];   
    this.cd.detectChanges();  
  });


   this.menuservice.cart$.subscribe((cart: any[]) => {
  this.cart = cart;
  
});

    

  }

  
  scrollToCategory(category: string) {
    document.getElementById(category)?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

