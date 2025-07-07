import { Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
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


export class OrderMasterComponent implements OnInit, AfterViewInit {
  catList: ICategory[];
  selectedCatID: number = 0;
  recievedOrderTotalPrice: number = 0;
  @ViewChild('customerNameInput') clientNameInputElement!: ElementRef;
  @ViewChild(ProductListComponent) productListComponent!: ProductListComponent;
  constructor() {
    this.catList = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' }
    ];
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onTotalPriceChanged(orderTotalPrice: number) {
    this.recievedOrderTotalPrice = orderTotalPrice;
  }

  ngAfterViewInit() {
    this.clientNameInputElement.nativeElement.value = 'Default Client Name';
    this.clientNameInputElement.nativeElement.style = 'background-color: yellow; color: red; font-size: 20px; font-weight: bold;';
  }

}
