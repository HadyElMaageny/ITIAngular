import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ICategory} from '../../../Models/ICategory';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from "../ProductList/ProductList.component";
import {ShoppingCartItem} from '../../../ViewModels/shopping-cart-item';

@Component({
  selector: 'app-order-master',
  templateUrl: './order-master.component.html',
  styleUrls: ['./order-master.component.css'],
  imports: [CommonModule, FormsModule, ProductListComponent]
})


export class OrderMasterComponent implements OnInit, AfterViewInit {
  catList: ICategory[];
  selectedCatID: number = 0;
  totalPrice: number = 0;
  taxValue: number = 0;
  shoppingCartItems: ShoppingCartItem[] = [];
  @ViewChild(ProductListComponent) productListComp!: ProductListComponent;
  @ViewChild('categorySelector') categorySelectRef!: ElementRef;

  constructor() {
    this.catList = [
      {id: 1, name: 'Category 1'},
      {id: 2, name: 'Category 2'},
      {id: 3, name: 'Category 3'}
    ];
  }

  confirmOrder(): void {
    // Access child component instance

    const date = this.productListComp.orderDate;
    const products = this.productListComp.prdListOfCat[0];
  }

  onItemAdded(newItem: ShoppingCartItem): void {
    const existingItem = this.shoppingCartItems.find(item => item.productID === newItem.productID);
    if (existingItem) {
      existingItem.selectedQuantity += newItem.selectedQuantity;
    } else {
      this.shoppingCartItems.push({...newItem});
    }

    this.calculateTotal();
  }


  calculateTotal(): void {
    this.totalPrice = this.shoppingCartItems.reduce(
      (sum, item) => sum + item.unitPrice * item.selectedQuantity, 0
    );
    this.taxValue = this.totalPrice * 0.14;
  }


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  // onTotalPriceChanged(orderTotalPrice: number) {
  //   this.receivedOrderTotalPrice = orderTotalPrice;
  // }

  ngAfterViewInit(): void {
    // ✅ a. Access the value
    const selectedValue = this.categorySelectRef.nativeElement.value;
    // console.log('Selected Category Value:', selectedValue);

    // ✅ b. Change the style
    this.categorySelectRef.nativeElement.style.backgroundColor = 'lightblue';
    this.categorySelectRef.nativeElement.style.color = 'white';
    this.categorySelectRef.nativeElement.style.fontWeight = 'bold';

    this.categorySelectRef.nativeElement.value = '2'; // This selects "Category 2"
    // console.log('Selected Category Value:', selectedValue);
  }
}
