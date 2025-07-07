import { IProduct } from './../../../Models/IProduct';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LightBoxDirective } from '../../../Directives/LightBox.directive';
import { USDToEGPPipe } from '../../../Pipes/USDToEGP.pipe';

@Component({
  selector: 'app-ProductList',
  templateUrl: './ProductList.component.html',
  styleUrls: ['./ProductList.component.css'],
  imports: [CommonModule, FormsModule, LightBoxDirective, USDToEGPPipe ]
})
export class ProductListComponent implements OnInit, OnChanges {
  prdList: IProduct[];
  prdListOfCat: IProduct[] = [];
  orderTotalPrice: number = 0;
  @Input() sentCatID: number = 0;
  @Output() totalPriceChanged: EventEmitter<number>;
  orderDate: Date = new Date();
  constructor() {
    this.totalPriceChanged = new EventEmitter<number>();
    this.prdList = [
      {
        id: 1,
        name: 'Product 1',
        price: 1000000,
        quantity: 1,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 1
      },
      {
        id: 2,
        name: 'Product 2',
        price: 2000000,
        quantity: 20,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 2
      },
      {
        id: 3,
        name: 'Product 3',
        price: 3000000000,
        quantity: 1,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 3
      },
      {
        id: 4,
        name: 'Product 4',
        price: 40000000,
        quantity: 0,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 1
      },
      {
        id: 5,
        name: 'Product 5',
        price: 500,
        quantity: 1,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 2
      },
      {
        id: 6,
        name: 'Product 6',
        price: 600,
        quantity: 60,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 3
      },
      {
        id: 7,
        name: 'Product 7',
        price: 700,
        quantity: 70,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 1
      },
      {
        id: 8,
        name: 'Product 8',
        price: 800,
        quantity: 80,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 2
      },
      {
        id: 9,
        name: 'Product 9',
        price: 900,
        quantity: 90,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 3
      },
      {
        id: 10,
        name: 'Product 10',
        price: 1000,
        quantity: 0,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 1
      },
      {
        id: 11,
        name: 'Product 11',
        price: 1100,
        quantity: 110,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 2
      },
      {
        id: 12,
        name: 'Product 12',
        price: 1200,
        quantity: 0,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 3
      }
    ];
    this.orderDate = new Date();
    this.prdListOfCat = this.prdList;
  }

  buy(product: IProduct, count: number): void {
    // const product = this.prdList.find(p => p.id === prodID);
    // if (product) {
    //   product.quantity -= Number(itemsCount);
    // }
    this.orderTotalPrice += +count * product.price;
    product.quantity -= +count;
    this.totalPriceChanged.emit(this.orderTotalPrice);
  }

  prdTrackByfn(index: number, item: IProduct): number {
    return item.id;
  }

  private filterProdByCat()
  {
    if (this.sentCatID === 0) {
      this.prdListOfCat = this.prdList;
    } else {
      this.prdListOfCat = this.prdList.filter(p => p.categoryID === this.sentCatID);
    }
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
      this.filterProdByCat();
  }

}
