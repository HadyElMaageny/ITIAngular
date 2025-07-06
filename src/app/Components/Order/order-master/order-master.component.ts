import { Component, Input, input, OnInit, Output } from '@angular/core';
import { ICategory } from '../../../Models/ICategory';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from "../ProductList/ProductList.component";

@Component({
  selector: 'app-order-master',
  templateUrl: './order-master.component.html',
  styleUrls: ['./order-master.component.css'],
  imports: [CommonModule, FormsModule, ProductListComponent]
})
export class OrderMasterComponent implements OnInit {
  catList: ICategory[];
  selectedCatID: number = 0;
  recievedOrderTotalPrice: number = 0;
  constructor() {
    this.catList = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' }
    ];
  }

  onTotalPriceChanged(orderTotalPrice: number) {
    this.recievedOrderTotalPrice = orderTotalPrice;
  }

  ngOnInit() {
  }

}
