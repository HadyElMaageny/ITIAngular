import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../Models/IProduct';

@Component({
  selector: 'app-ProductList',
  templateUrl: './ProductList.component.html',
  styleUrls: ['./ProductList.component.css'],
  imports: [CommonModule]
})
export class ProductListComponent implements OnInit {
  prdList: IProduct[];
  constructor() {
    this.prdList = [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 10,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 1
      },
      {
        id: 2,
        name: 'Product 2',
        price: 200,
        quantity: 20,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 2
      },
      {
        id: 3,
        name: 'Product 3',
        price: 300,
        quantity: 30,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 3
      }
    ];
  }

  buy(prodID: number, itemsCount: any) {
    const product = this.prdList.find(p => p.id === prodID);
    if (product) {
      product.quantity -= Number(itemsCount);
    }
  }

  ngOnInit() {
  }

}
