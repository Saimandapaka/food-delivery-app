import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { NotificationListComponent } from '@features/notifications/components/notification-list/notification-list.component';
import { AddnewaddressComponent } from './components/addnewaddress/addnewaddress.component';
import { OrderHistoryComponent } from '@features/orders/components/order-history/order-history.component';

const routes: Routes = [
  
 
  {
    path:'',component:ProfilePageComponent
  },
  {
    path:'personalinfo',component:ProfileInfoComponent
  },
  {
    path:'savedaddress',component:AddressFormComponent
  },
  {
    path:'orderhistory',component:OrderHistoryComponent
  },
  {
    path:'notifications',component:NotificationListComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
