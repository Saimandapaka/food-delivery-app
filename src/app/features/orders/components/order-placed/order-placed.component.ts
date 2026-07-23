import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {

  order: any;
  restaurantName: any ;
  resname:string='';
  isMobile = window.innerWidth <= 768;
  constructor(private orderService: OrderService) {}
  @HostListener('window:resize')
onResize() {
  this.isMobile = window.innerWidth <= 768;
}

  ngOnInit(): void {

    // Get the latest placed order
    this.orderService.getLatestOrder().subscribe(data => {

      this.order = data[data.length - 1];
      this.restaurantName=data;
      this.resname=data[data.length-1].restaurantName
      console.log(data)
    });
    

  }
  

}