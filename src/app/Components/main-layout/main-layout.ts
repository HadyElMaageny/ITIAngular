import { Component } from '@angular/core';
import {Header} from '../header/header';
import {Sidebar} from '../sidebar/sidebar';
import {OrderMasterComponent} from '../Order/order-master/order-master.component';
import {Footer} from '../footer/footer';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    Header,
    Sidebar,
    Footer,
    RouterOutlet
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {

}
