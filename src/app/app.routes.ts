import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/restaurants/restaurants.module')
        .then(m => m.RestaurantsModule)
  },
  {
    path: 'restaurants',
    loadChildren: () =>
      import('./features/restaurants/restaurants.module')
        .then(m => m.RestaurantsModule)
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./features/menu/menu.module')
        .then(m => m.MenuModule)
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/cart/cart.module')
        .then(m => m.CartModule)
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders.module')
        .then(m => m.OrdersModule)
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./features/notifications/notifications.module')
        .then(m => m.NotificationsModule)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module')
        .then(m => m.ProfileModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }