import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../../Models/IProduct';
import {StaticProductService} from '../../../Services/static-product.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  receivedPrdId: number = 0;
  prd: IProduct | undefined = {} as IProduct;

  constructor(private activatedRoute: ActivatedRoute, private staticProductService: StaticProductService, private location: Location) {
  }

  ngOnInit() {
    this.receivedPrdId = this.activatedRoute.snapshot.params['id'];
    this.prd = this.staticProductService.getProdById(this.receivedPrdId);
  }

  goBack(): void {
    this.location.back();
  }
}
