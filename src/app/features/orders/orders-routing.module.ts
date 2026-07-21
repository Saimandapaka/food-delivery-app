import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';

const routes: Routes = [
  {
    path: '' , component: OrderHistoryComponent
  },
  
  {
  path: 'order-placed',
  component: OrderPlacedComponent
},
   {
    path: ':id',
    component: OrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
