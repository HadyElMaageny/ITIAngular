import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../Models/IProduct';
import { ICategory } from '../../../Models/ICategory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ProductList',
  templateUrl: './ProductList.component.html',
  styleUrls: ['./ProductList.component.css'],
  imports: [CommonModule, FormsModule ]
})
export class ProductListComponent implements OnInit {
  prdList: IProduct[];
  catList: ICategory[];
  selectedCatID: number = 0;
  constructor() {
    this.catList = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' }
    ];
    this.prdList = [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 1,
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
        quantity: 1,
        imageUrl: 'https://picsum.photos/200/300',
        categoryID: 3
      },
      {
        id: 4,
        name: 'Product 4',
        price: 400,
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
  }

  buy(prodID: number, itemsCount: any) {
    const product = this.prdList.find(p => p.id === prodID);
    if (product) {
      product.quantity -= Number(itemsCount);
    }
  }

  prdTrackByfn(index: number, item: IProduct): number {
    return item.id;
  }

  ngOnInit() {
  }

}
