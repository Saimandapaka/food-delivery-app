import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { MenuListComponent } from '@features/menu/components/menu-list/menu-list.component';

const routes: Routes = [
  {
    path: '', component: RestaurantListComponent
  },
  {
    path:':id' ,component:RestaurantDetailsComponent,
  
  
  children: [
    {
      path: 'menu',
      component: MenuListComponent
    }
  ]
},
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
