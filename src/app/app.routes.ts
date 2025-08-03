import {Routes} from '@angular/router';

import {Home} from './Components/home/home';
import {ProductListComponent} from './Components/Order/ProductList/ProductList.component';
import {ProductDetails} from './Components/Order/product-details/product-details';
import {OrderMasterComponent} from './Components/Order/order-master/order-master.component';
import {UserLogin} from './Components/user-login/user-login';
import {MainLayout} from './Components/main-layout/main-layout';
import {NotFound} from './Components/not-found/not-found';
import {authGuard} from './Guards/auth-guard';
import {AddProductComponent} from './Components/add-product-component/add-product-component';
import {UserRegister} from './Components/user-register/user-register';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: Home},

      {
        path: 'products',
        children: [
          {path: '', component: ProductListComponent},
          {path: 'add', component: AddProductComponent},
          {path: 'add/:id', component: AddProductComponent},
          {path: ':id', component: ProductDetails},
        ],
      },

      {
        path: 'orders',
        component: OrderMasterComponent,
        canActivate: [authGuard],
      },

      {path: 'login', component: UserLogin},
      {path: 'logout', component: UserLogin},
      {path: 'register', component: UserRegister},

    ],
  },

  {path: '**', component: NotFound},
];
