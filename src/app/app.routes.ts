import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShopComponent } from './pages/shop/shop.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
      {
        path: 'detail/:name',
        component: DetailComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
];
