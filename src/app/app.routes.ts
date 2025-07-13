import { Routes } from '@angular/router';
import {Home} from './Components/home/home';
import {ProductListComponent} from './Components/Order/ProductList/ProductList.component';
import {ProductDetails} from './Components/Order/product-details/product-details';
import {OrderMasterComponent} from './Components/Order/order-master/order-master.component';
import {UserLogin} from './Components/user-login/user-login';
import {MainLayout} from './Components/main-layout/main-layout';
import {NotFound} from './Components/not-found/not-found';

export const routes: Routes = [
  {path: '', component: MainLayout, children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: Home},
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id', component: ProductDetails},
      {path: 'orders', component: OrderMasterComponent},
    ]},
  {path: 'login', component: UserLogin},
  {path: '**', component: NotFound},
];
