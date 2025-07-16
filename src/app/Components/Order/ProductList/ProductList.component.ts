import {IProduct} from './../../../Models/IProduct';
import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LightBoxDirective} from '../../../Directives/LightBox.directive';
import {USDToEGPPipe} from '../../../Pipes/USDToEGP.pipe';
import {ShoppingCartItem} from '../../../ViewModels/shopping-cart-item';
import {StaticProductService} from '../../../Services/static-product.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-ProductList',
  templateUrl: './ProductList.component.html',
  styleUrls: ['./ProductList.component.css'],
  imports: [CommonModule, FormsModule, LightBoxDirective, USDToEGPPipe, RouterLink]
})
export class ProductListComponent implements OnInit, OnChanges {
  prdListOfCat: IProduct[] = [];
  orderTotalPrice: number = 0;
  @Input() sentCatID: number = 0;
  @Output() totalPriceChanged: EventEmitter<number>;
  @Output() itemAddedToCart: EventEmitter<ShoppingCartItem> = new EventEmitter();
  orderDate: Date = new Date();

  constructor(private staticProductService: StaticProductService) {
    this.totalPriceChanged = new EventEmitter<number>();
    this.orderDate = new Date();
  }

  addToCart(product: IProduct, qtyInput: HTMLInputElement): void {
    const count = +qtyInput.value;

    if (count <= 0 || count > product.quantity) {
      alert(`Invalid quantity for product: ${product.name}`);
      return;
    }

    product.quantity -= count;

    const cartItem: ShoppingCartItem = {
      productID: product.id,
      productName: product.name,
      unitPrice: product.price,
      selectedQuantity: count
    };

    this.itemAddedToCart.emit(cartItem);

    // Clear the input after adding
    qtyInput.value = '';
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

  private filterProdByCat() {
    // this.prdList = this.staticProductService.filterProdByCat(this.sentCatID);
  }

  ngOnInit() {
    this.prdListOfCat = this.staticProductService.getAllProducts();
  }

  ngOnChanges(): void {
    // this.filterProdByCat();
    this.prdListOfCat = this.staticProductService.filterProdByCat(this.sentCatID);
  }

  getPreviousProduct() {

  }

}
