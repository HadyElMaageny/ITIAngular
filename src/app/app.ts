import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Components/header/header';
import { Sidebar } from './Components/sidebar/sidebar';
import { Home } from './Components/home/home';
import { Footer } from './Components/footer/footer';
import { ProductListComponent } from "./Components/Order/ProductList/ProductList.component";
import { OrderMasterComponent } from "./Components/Order/order-master/order-master.component";

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Sidebar, OrderMasterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ITIAngular';
}
