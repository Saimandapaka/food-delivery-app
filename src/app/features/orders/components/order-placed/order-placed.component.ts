import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {

  order: any;
  restaurantName: any ;
  resname:string='';
  constructor(private orderService: OrderService) {}

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