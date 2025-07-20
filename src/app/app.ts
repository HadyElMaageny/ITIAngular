import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Components/header/header';
import { Sidebar } from './Components/sidebar/sidebar';
import { Home } from './Components/home/home';
import { Footer } from './Components/footer/footer';
import { ProductListComponent } from "./Components/Order/ProductList/ProductList.component";
import { OrderMasterComponent } from "./Components/Order/order-master/order-master.component";
import {ParentComponent} from './Components/parent-component/parent-component';
import {ChildComponent} from './Components/child-component/child-component';
import {SiblingComponent} from './Components/sibiling-component/sibling.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ParentComponent, ChildComponent, SiblingComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'FE';
}
